import { useState } from 'react';


import { useUpdateProjectTemplate } from './hooks/useUpdateProjectTemplate';
import { useDeleteProjectTemplate } from './hooks/useDeleteProjectTemplate';
import { useCreateProjectTemplate } from './hooks/useCreateProjectTemplate';
import { ProjectTemplate } from './types';
import TableProjectTemplates from './TableProjectTemplates';
import EditProjectTemplateDialog from './EditProjectTemplateDialog';
import DeleteProjectTemplateAlertDialog from './DeleteProjectTemplateAlertDialog';
import useGetAllProjectTemplates from './hooks/useGetAllProjectTemplates';

const ProjectTemplatesPage = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedProjectTemplate, setSelectedProjectTemplate] = useState<ProjectTemplate | null>(null);
  const [projectTemplateId, setProjectTemplateId] = useState<number | null>(null);

  const { projectTemplates, error, isLoading } = useGetAllProjectTemplates();
  const { mutate: updateProjectTemplate } = useUpdateProjectTemplate();
  const { mutate: deleteProjectTemplate } = useDeleteProjectTemplate();
  const { mutate: createProjectTemplate } = useCreateProjectTemplate();

  const handleEditProjectTemplate = (projectTemplate: ProjectTemplate) => {
    setIsEdit(true);
    setSelectedProjectTemplate(projectTemplate);
    setIsOpenEditModal(true);
  };

  const handleUpdate = (updatedTemplate: ProjectTemplate) => {
    if (isEdit && selectedProjectTemplate) {
      updateProjectTemplate({ ...updatedTemplate, id: selectedProjectTemplate.id });
    } else {
      createProjectTemplate(updatedTemplate);
    }

    setIsOpenEditModal(false);
    setIsEdit(false);
    setSelectedProjectTemplate(null);
  };

  const handleDeleteProjectTemplate = (projectTemplateId: number) => {
    setProjectTemplateId(projectTemplateId);
    setIsOpenDeleteModal(true);
  };

  const handleDelete = () => {
    if (projectTemplateId) {
      deleteProjectTemplate(projectTemplateId);
    }
    setIsOpenDeleteModal(false);
  };

  const handleCreateProjectTemplate = () => {
    setIsEdit(false);
    setSelectedProjectTemplate(null);
    setIsOpenEditModal(true);
  };

  if (isLoading) return <div>Loading project templates...</div>;
  if (error) return <div>Error loading project templates: {error.message}</div>;

  return (
    <div>
      <TableProjectTemplates
        projectTemplates={projectTemplates}
        onAddProjectTemplate={handleCreateProjectTemplate}
        onEditProjectTemplate={handleEditProjectTemplate}
        onDeleteProjectTemplate={handleDeleteProjectTemplate}
      />
      {isOpenEditModal && (
        <EditProjectTemplateDialog
          initialValues={isEdit ? selectedProjectTemplate : undefined}
          onSave={handleUpdate}
          isOpen={isOpenEditModal}
          onClose={() => setIsOpenEditModal(false)}
        />
      )}
      {isOpenDeleteModal && projectTemplateId && (
        <DeleteProjectTemplateAlertDialog
          onSave={handleDelete}
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectTemplatesPage;
