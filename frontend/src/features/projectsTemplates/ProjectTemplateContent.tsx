import React, { useState } from 'react';
import { ProjectTemplate } from './types';
import DeleteTaskAlertDialog from '../tasks/DeleteTaskAlertDialog';
import TaskFormModal from '../tasks/TaskFormModal';
import { Project, Task, TaskStatus } from '../projects/types';
import { useCreateTask } from '../tasks/hooks/useCreateTask';
import { useEditTask } from '../tasks/hooks/useEditTask';
import { useDeleteTask } from '../tasks/hooks/useDeleteTask';
import TaskCard from '../tasks/TaskCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ProjectTemplateContentProps = {
    projectTemplate: Project | ProjectTemplate | undefined;
};

const ProjectTemplateContent: React.FC<ProjectTemplateContentProps> = ({ projectTemplate }) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [initialTaskData, setInitialTaskData] = useState<Task | undefined>(undefined);
    const [taskId, setTaskId] = useState<number | undefined>(undefined);

    const { mutate: createTask } = useCreateTask();
    const { mutate: editTask } = useEditTask();
    const { mutate: deleteTask } = useDeleteTask();

    // Destrukturyzacja projectTemplate
    const { id, name, description, tasks } = projectTemplate || {};

    const handleAddTask = () => {
        setInitialTaskData(undefined);
        setIsTaskFormOpen(true);
    };

    const handleSaveTask = (taskData: Task) => {
        if (initialTaskData) {
            const updatedTask = {
                id: initialTaskData.id,
                project_template_id: initialTaskData.project_template_id,
                ...taskData
            };
            editTask(updatedTask);
        } else {
            createTask({ project_template_id: id, author: Number(localStorage.getItem('userId')), ...taskData });
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
    console.log(tasks)
    const renderTasks = (status: TaskStatus) => (
        tasks && tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard
                    key={`${task.id}`}  // Combined unique key
                    task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
            ))
    );

    return (
        <div className="max-w-7xl mx-auto p-6">

            <div className="mb-6">
                <Card className="p-6">
                    <h1 className="text-3xl font-semibold mb-4 text-gray-800">{name}</h1>

                    <p className="text-gray-700 mb-4">
                        <strong>Opis szablonu:</strong> {description}
                    </p>
                </Card>
            </div>

            <div className="mb-4 flex gap-2">
                <Button variant={'outline'} onClick={handleAddTask}>Dodaj zadanie</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        <h2 className="text-xl mb-2"><Badge variant="outline">Do zrobienia</Badge></h2>

                    </h2>
                    <div>{renderTasks(TaskStatus.TO_DO)}</div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        <h2 className="text-xl mb-2"><Badge variant="outline">W trkacie</Badge></h2>

                    </h2>
                    <div>{renderTasks(TaskStatus.IN_PROGRESS)}</div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        <h2 className="text-xl mb-2"><Badge variant="outline">Zakończone</Badge></h2>
                    </h2>
                    <div>{renderTasks(TaskStatus.COMPLETED)}</div>
                </div>
            </div>

            {/* Task Form Modal */}
            {isTaskFormOpen && (
                <TaskFormModal
                    isTemplate={true}
                    initialValues={initialTaskData}
                    onClose={() => setIsTaskFormOpen(false)}
                    onSave={handleSaveTask}
                    isOpen={isTaskFormOpen}
                />
            )}

            {/* Delete Task Confirmation Modal */}
            {isOpenDeleteModal && (
                <DeleteTaskAlertDialog
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                    onSave={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default ProjectTemplateContent;
