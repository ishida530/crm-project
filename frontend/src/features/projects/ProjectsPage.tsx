import useGetProjects from "./hooks/useGetProjects";
import ProjectTable from "./ProjectTable";

const ProjectsPage = () => {
    const { projects, error, isLoading } = useGetProjects();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Projects</h1>
            {projects && <ProjectTable data={projects} />}
        </div>
    );
};

export default ProjectsPage;
