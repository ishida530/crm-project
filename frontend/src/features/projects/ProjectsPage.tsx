import { useState } from "react";
import useGetProjects from "./hooks/useGetProjects";
import ProjectTable from "./table/ProjectsTable";
import ProjectFormModal from "./ProjectFormModal";
import { useCreateProject } from "./hooks/useCreateProject";
import { Project } from "./types";
import { useDeleteProject } from "./hooks/useDeleteProject";
import DeleteProjectAlertDialog from "./DeleteProjectAlertDialog";
import { useEditProject } from "./hooks/useEditProject";

const ProjectsPage = () => {
    const { projects, error, isLoading } = useGetProjects(); 
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [projectId, setProjectId] = useState<number>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { mutate: createProject } = useCreateProject();
    const { mutate: deleteProject } = useDeleteProject();
    const { mutate: editProject } = useEditProject()

    const handleAddProject = () => {
        setIsFormOpen(true);
        setProjectToEdit(null);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmit = (projectData: Project) => {
        if (projectToEdit) {
            console.log("Updated project", projectData);
            editProject({ id: projectToEdit.id, ...projectData })
        } else {
            createProject(projectData); 
        }
        setProjectToEdit(null)
        handleCloseForm();
    };

    const handleEditProject = (project: Project) => {
        console.log('atuu', project)
        setProjectToEdit({
            id: project.id,
            deadline: project.deadline,
            name: project.name,
            investorRepresentative: project.investorRepresentative,
            projectManager: project.projectManager,
            tasks: []
        });
        setIsFormOpen(true);
    };



    const handleDelete = () => {
        if (projectId) deleteProject(projectId)

        setIsOpenDeleteModal(false);
    };


    const handleDeleteProject = async (projectId: number) => {
        setProjectId(projectId);
        setIsOpenDeleteModal(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Projects</h1>
            {projects && (
                <ProjectTable
                    data={projects}
                    onAddProject={handleAddProject}
                    onEditProject={handleEditProject}
                    onDeleteProject={handleDeleteProject}
                />
            )}
            {isFormOpen && (
                <ProjectFormModal
                    onClose={handleCloseForm}
                    onSave={handleSubmit}
                    isOpen={isFormOpen}
                    initialValues={projectToEdit ? projectToEdit : undefined}

                />
            )}

            {isOpenDeleteModal && (
                <DeleteProjectAlertDialog
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                    onSave={handleDelete}
                />
            )}


        </div>
    );
};

export default ProjectsPage;
