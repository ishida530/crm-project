import { useState } from "react";
import { useEditProjectGroup } from "./hooks/useEditProjectGroup"; // Custom hook to edit project group
import { useDeleteProjectGroup } from "./hooks/useDeleteProjectGroup"; // Custom hook to delete project group
import ProjectGroupFormModal from "./ProjectGroupFormModal"; // Modal for adding/editing project group
import { ProjectGroup } from "./types"; // Type for ProjectGroup
import { Loader } from "@/components/ui/loader"; // Loader component
import DeleteProjectGroupAlertDialog from "./DeleteProjectGroupAlertDialog"; // Modal for delete confirmation
import useGetProjectGroupDetails from "./hooks/useGetProjectGroupDetails";
import { useParams } from "react-router-dom";
import ProjectGroupDetailsTable from "./ProjectGroupDetailsTable";

const ProjectGroupDetailsPage = () => {


    const { id } = useParams()
    const { data, error, isLoading } = useGetProjectGroupDetails(Number(id));
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [projectGroupToEdit, setProjectGroupToEdit] = useState<ProjectGroup | null>(null);
    const [projectGroupId, setProjectGroupId] = useState<number>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    // const { mutate: editProjectGroup } = useEditProjectGroup();
    // const { mutate: deleteProjectGroup } = useDeleteProjectGroup();
    const handleAddProjectGroup = () => {
        setIsFormOpen(true);
        setProjectGroupToEdit(null);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmit = (projectGroupData: ProjectGroup) => {
        if (projectGroupToEdit) {
            console.log("Updated project group", projectGroupData);
            editProjectGroup({ id: projectGroupToEdit.id, ...projectGroupData });
        } else {
            // Here you would call the create function for project group if it exists
        }
        setProjectGroupToEdit(null);
        handleCloseForm();
    };

    const handleEditProjectGroup = (projectGroup: ProjectGroup) => {
        console.log("Editing project group", projectGroup);
        setProjectGroupToEdit({ ...projectGroup });
        setIsFormOpen(true);
    };

    const handleDelete = () => {
        if (projectGroupId) deleteProjectGroup(projectGroupId);
        setIsOpenDeleteModal(false);
    };

    const handleDeleteProjectGroup = (projectGroupId: number) => {
        setProjectGroupId(projectGroupId);
        setIsOpenDeleteModal(true);
    };

    if (isLoading) {
        return <Loader isVisible />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Grupa {data.name}</h1>

            <ProjectGroupDetailsTable
                data={data}
                onAddProjectGroup={handleAddProjectGroup}
                onEditProjectGroup={handleEditProjectGroup}
                onDeleteProjectGroup={handleDeleteProjectGroup}
            />

            {/* {isFormOpen && (
                <ProjectGroupFormModal
                    onClose={handleCloseForm}
                    onSave={handleSubmit}
                    isOpen={isFormOpen}
                    initialValues={projectGroupToEdit ? projectGroupToEdit : undefined}
                />
            )} */}
            {isOpenDeleteModal && (
                <DeleteProjectGroupAlertDialog
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                    onSave={handleDelete}
                />
            )}
        </div>
    );
};

export default ProjectGroupDetailsPage;
