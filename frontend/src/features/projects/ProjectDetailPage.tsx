import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaskCard from '../tasks/TaskCard';
import { Project, Task, TaskStatus } from './types';
import TaskFormModal from '../tasks/TaskFormModal';
import DeleteTaskAlertDialog from '../tasks/DeleteTaskAlertDialog';
import { useCreateTask } from '../tasks/hooks/useCreateTask';
import { useEditTask } from '../tasks/hooks/useEditTask';
import { useDeleteTask } from '../tasks/hooks/useDeleteTask';
import { matchPath, useLocation, useParams } from 'react-router-dom';
import useGetProjectDetails from './hooks/useGetProjectDetails';
import useGetProjectTemplateDetails from '../projectsTemplates/hooks/useGetProjectTemplateDetails';
import { ProjectTemplate } from '../projectsTemplates/types';
import { useMatch } from 'react-router-dom';
import ProjectTemplateContent from '../projectsTemplates/ProjectTemplateContent';
import ProjectDetailContent from './ProjectDetailContent';


type ProjectResponse = {
    data?: Project | ProjectTemplate;
    error?: string;
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
        console.log('tak?')
        return <ProjectDetailContent project={data} />
    }
    else {
        console.log('nie')

        return <ProjectTemplateContent projectTemplate={data} />
    }


};

export default ProjectDetailPage;
