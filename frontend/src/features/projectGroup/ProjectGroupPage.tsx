import { useState } from 'react';

import { Loader } from '@/components/ui/loader';
import useGetAllProjectGroups from './hooks/useGetAllProjectGroups';
import { useUpdateProjectGroup } from './hooks/useUpdateProjectGroup';
import { useDeleteProjectGroup } from './hooks/useDeleteProjectGroup';
import { useCreateProjectGroup } from './hooks/useCreateProjectGroup';
import { ProjectGroup } from './types';
import ProjectGroupTable from './ProjectGroupTable';
import EditProjectGroupDialog from './EditProjectGroupDialog';
import DeleteProjectGroupAlertDialog from './DeleteProjectGroupAlertDialog';

const ProjectGroupPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedProjectGroup, setSelectedProjectGroup] = useState<ProjectGroup | null>(null);
    const [projectGroupId, setProjectGroupId] = useState<number | null>(null);

    const { projectGroups, error, isLoading } = useGetAllProjectGroups();
    const { mutate: updateProjectGroup } = useUpdateProjectGroup();
    const { mutate: deleteProjectGroup } = useDeleteProjectGroup();
    const { mutate: createProjectGroup } = useCreateProjectGroup();

    const handleEditProjectGroup = (projectGroup: ProjectGroup) => {
        setIsEdit(true);
        setSelectedProjectGroup(projectGroup);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedGroup: ProjectGroup) => {
        console.log('updatedGroup', updatedGroup)
        if (isEdit && selectedProjectGroup) {
            updateProjectGroup({ ...updatedGroup, id: selectedProjectGroup.id });
        } else {
            createProjectGroup(updatedGroup);
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedProjectGroup(null);
    };

    const handleDeleteProjectGroup = (projectGroupId: number) => {
        setProjectGroupId(projectGroupId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (projectGroupId) {
            deleteProjectGroup(projectGroupId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateProjectGroup = () => {
        setIsEdit(false);
        setSelectedProjectGroup(null);
        setIsOpenEditModal(true);
    };

    if (isLoading) {
        return <Loader isVisible />;
    }
    if (error) return <div>Error loading project groups: {error.message}</div>;

    return (
        <div>
            <ProjectGroupTable
                projectGroups={projectGroups ? projectGroups : []}
                onAddGroup={handleCreateProjectGroup}
                onEditGroup={handleEditProjectGroup}
                onDeleteGroup={handleDeleteProjectGroup}
            />
            {isOpenEditModal && (
                <EditProjectGroupDialog
                    initialValues={isEdit ? selectedProjectGroup : undefined}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
            {isOpenDeleteModal && projectGroupId && (
                <DeleteProjectGroupAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default ProjectGroupPage;
