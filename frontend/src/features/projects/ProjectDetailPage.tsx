import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaskCard from './tasks/TaskCard';
import { Task, TaskStatus } from './types';
import TaskFormModal from './TaskFormModal';
import DeleteTaskAlertDialog from './DeleteTaskAlertDialog';
import { useCreateTask } from './hooks/useCreateTask';
import { useEditTask } from './hooks/useEditTask';
import { useDeleteTask } from './hooks/useDeleteTask';
import { useParams } from 'react-router-dom';
import useGetProjectDetails from './hooks/useGetProjectDetails';

const ProjectDetailPage = () => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [initialTaskData, setInitialTaskData] = useState<Task | undefined>(undefined);
    const [taskId, setTaskId] = useState<number | undefined>(undefined);

    const { mutate: createTask } = useCreateTask();
    const { mutate: editTask } = useEditTask();
    const { mutate: deleteTask } = useDeleteTask();

    const { id } = useParams();

    const { project, error, isLoading } = useGetProjectDetails(id);

    const handleAddTask = () => {
        setInitialTaskData(undefined);
        setIsTaskFormOpen(true);
    };
    const handleSaveTask = (taskData: Task) => {
        if (initialTaskData) {
            const updatedTask = {
                id: initialTaskData.id,
                project: initialTaskData.project,
                ...taskData
            };
            editTask(updatedTask);
        } else {
            createTask({ project: id, ...taskData });
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

    const handleDeleteTask = async (taskId: number) => {
        setTaskId(taskId);
        setIsOpenDeleteModal(true);
    };

    if (project) {
        const { deadline, investorRepresentative, name, projectManager, tasks } = project;
        const renderTasks = (status: TaskStatus) => (
            tasks && tasks
                .filter(task => task.status === status)
                .map(task => (
                    <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
                ))
        );

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

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
                                <strong>Reprezentant Inwestora:</strong> {investorRepresentative}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Kierownik Projektu:</strong> {projectManager}
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
    }
};

export default ProjectDetailPage;
