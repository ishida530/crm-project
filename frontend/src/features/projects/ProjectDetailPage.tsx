
import { Project } from './types';

import { useLocation, useParams } from 'react-router-dom';

import { ProjectTemplate } from '../projectsTemplates/types';
import ProjectTemplateContent from '../projectsTemplates/ProjectTemplateContent';
import ProjectDetailContent from './ProjectDetailContent';


type ProjectResponse = {
    data?: Project | ProjectTemplate;
    error?: Error | null;
    isLoading?: boolean;
};

type ProjectDetailPageType = {
    getProject: (id: number) => ProjectResponse
}


const ProjectDetailPage = ({ getProject }: ProjectDetailPageType) => {

    const { id } = useParams()
    const { data, error, isLoading } = getProject(Number(id));

    const { pathname } = useLocation()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    if (!pathname.includes('templates')) {
        console.log('data,:', data)
        return <ProjectDetailContent project={data} />
    }
    else {
        console.log('nie')

        return <ProjectTemplateContent projectTemplate={data} />
    }


};

export default ProjectDetailPage;
