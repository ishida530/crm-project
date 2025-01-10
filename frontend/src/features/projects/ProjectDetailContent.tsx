import React, { useEffect, useState } from 'react';
import { Project, Task, TaskStatus } from './types';
import { useCreateTask } from '../tasks/hooks/useCreateTask';
import { useEditTask } from '../tasks/hooks/useEditTask';
import { useDeleteTask } from '../tasks/hooks/useDeleteTask';
import TaskCard from '../tasks/TaskCard';
import DeleteTaskAlertDialog from '../tasks/DeleteTaskAlertDialog';
import TaskFormModal from '../tasks/TaskFormModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectTemplate } from '../projectsTemplates/types';
import useGetTasksProjects from './hooks/useGetTasksProjects';

type ProjectDetailContentProps = {
    project: Project | ProjectTemplate | undefined;
};


const ProjectDetailContent = ({ project }: ProjectDetailContentProps) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [initialTaskData, setInitialTaskData] = useState<Task | undefined>(undefined);
    const [taskId, setTaskId] = useState<number | undefined>(undefined);

    const { mutate: createTask } = useCreateTask();
    const { mutate: editTask } = useEditTask();
    const { mutate: deleteTask } = useDeleteTask();
    
    const { deadline, investor_representative, name, project_manager, id } = project || {};
    
    const { data: tasks } = useGetTasksProjects(id)
    const handleAddTask = () => {
        setInitialTaskData(undefined);
        setIsTaskFormOpen(true);
    };

    const handleSaveTask = (taskData: Task) => {
        const userId = Number(localStorage.getItem('userId'));
        if (userId === null) {
            console.error('User ID is not available in localStorage');
            return;
        }

        if (initialTaskData) {
            const updatedTask = {
                id: initialTaskData.id,
                project: initialTaskData.project,
                author: userId,

                ...taskData
            };
            editTask(updatedTask);
        } else {
            createTask({ project: project?.id, author: userId, ...taskData });
        }
        setInitialTaskData(undefined);
        setIsTaskFormOpen(false);
    };

    const handleEditTask = (task: Task, status?: TaskStatus) => {
        if (status) {
            editTask({ ...task, status });
        } else {
            setInitialTaskData(task);
            setIsTaskFormOpen(true);
        }
    };

    const handleDeleteConfirm = () => {
        if (taskId) deleteTask(taskId);
        setIsOpenDeleteModal(false);
    };

    const handleDeleteTask = (taskId: number) => {
        setTaskId(taskId);
        setIsOpenDeleteModal(true);
    };

    const renderTasks = (status: TaskStatus) => (

        tasks && tasks
            .filter((task: Task) => task.status === status)
            .map((task: Task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
            ))
    );

    return (
        <>
            <div className="p-6">
                <div className="mb-6">
                    <Card className="p-6">
                        <h1 className="text-3xl mb-2">{name}</h1>
                        <p className="text-gray-700 mb-2">
                            <strong>Deadline:</strong> {deadline}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Reprezentant Inwestora:</strong> {investor_representative}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Kierownik Projektu:</strong> {project_manager}
                        </p>
                    </Card>
                </div>

                <div className="mb-4 flex gap-2">
                    <Button variant={'outline'} onClick={handleAddTask}>Dodaj zadanie</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <h2 className="text-xl mb-2">
                            <Badge variant="outline">Todo</Badge>
                        </h2>
                        <div className="space-y-2">{renderTasks(TaskStatus.TO_DO)}</div>
                    </div>
                    <div>
                        <h2 className="text-xl mb-2">
                            <Badge variant="outline">In Progress</Badge>
                        </h2>
                        <div className="space-y-2">{renderTasks(TaskStatus.IN_PROGRESS)}</div>
                    </div>
                    <div>
                        <h2 className="text-xl mb-2">
                            <Badge variant="outline">Complete</Badge>
                        </h2>
                        <div className="space-y-2">{renderTasks(TaskStatus.COMPLETED)}</div>
                    </div>
                </div>
            </div>
            {isTaskFormOpen && (
                <TaskFormModal
                    initialValues={initialTaskData ? initialTaskData : null}
                    onClose={() => setIsTaskFormOpen(false)}
                    onSave={handleSaveTask}
                    isOpen={isTaskFormOpen}
                />
            )}
            {isOpenDeleteModal && (
                <DeleteTaskAlertDialog
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                    onSave={handleDeleteConfirm}
                />
            )}
        </>
    );
};

export default ProjectDetailContent;
