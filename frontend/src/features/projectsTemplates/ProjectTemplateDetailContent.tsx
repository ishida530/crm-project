import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Task, TaskStatus } from '../projects/types';
import { ProjectTemplate } from './types';
import TaskCard from '../tasks/TaskCard';

type ProjectTemplateContentProps = {
    projectTemplate: ProjectTemplate;
    onAddTask: () => void;
    onEditTask: (task: Task, status?: TaskStatus) => void;
    onDeleteTask: (taskId: number) => void;
};

const ProjectTemplateContent = ({ projectTemplate, onAddTask, onEditTask, onDeleteTask }: ProjectTemplateContentProps) => {
    const { name, description, tasks } = projectTemplate;

    const renderTasks = (status: TaskStatus) => (
        tasks.filter(task => task.status === status).map(task => (
            <TaskCard key={task.projectTemplateId} task={task} onDelete={onDeleteTask} onEdit={onEditTask} />
        ))
    );

    return (
        <>
            <div className="p-6">
                <div className="mb-6">
                    <Card className="p-6">
                        <h1 className="text-3xl mb-2">{name}</h1>
                        <p className="text-gray-700 mb-2"><strong>Opis:</strong> {description}</p>
                    </Card>
                </div>

                <div className="mb-4 flex gap-2">
                    <Button variant={'outline'} onClick={onAddTask}>Dodaj zadanie</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <h2 className="text-xl mb-2"><Badge variant="outline">Do zrobienia</Badge></h2>
                        <div className="space-y-2">{renderTasks(TaskStatus.TO_DO)}</div>
                    </div>
                    <div>
                        <h2 className="text-xl mb-2"><Badge variant="outline">W trkacie</Badge></h2>
                        <div className="space-y-2">{renderTasks(TaskStatus.IN_PROGRESS)}</div>
                    </div>
                    <div>
                        <h2 className="text-xl mb-2"><Badge variant="outline">Zakończone</Badge></h2>
                        <div className="space-y-2">{renderTasks(TaskStatus.COMPLETED)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProjectTemplateContent;