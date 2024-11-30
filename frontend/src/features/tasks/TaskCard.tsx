import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, TaskStatus } from '../projects/types';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { getStatusProperties } from '../projects/hooks/utils';
import { useParams } from 'react-router-dom';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task, status?: TaskStatus) => void;
    onDelete: (id: number) => void;
}

const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
    const { id } = useParams();


    return (
        <Card key={task.id} className="border border-gray-200 rounded-lg shadow-sm bg-white p-4">
            <CardHeader className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-lg font-semibold">{task.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">{task.description}</CardDescription>
                </div>
                <Button variant="outline" className="w-full md:w-auto" onClick={() => onEdit(task)}>
                    Edytuj
                </Button>
            </CardHeader>

            <CardContent className="mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Data:</span> {new Date(task.date).toLocaleDateString("pl-PL")}
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Autor:</span> {task.author}
                    </p>
                </div>
            </CardContent>

            {/* Kontener dla przycisków */}
            <div className="mt-4 flex flex-col sm:flex-row lg:flex-row sm:items-center gap-4 justify-between">
                {/* Select dla zmiany statusu */}
                <div className="w-full sm:w-60 lg:w-48">
                    <Select
                        defaultValue={task.status}
                        onValueChange={(newStatus: TaskStatus) => onEdit(task, newStatus)}
                        className="w-full"
                    >
                        <SelectTrigger>
                            <span>Zmień status</span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TaskStatus.TO_DO}>Oczekujące</SelectItem>
                            <SelectItem value={TaskStatus.IN_PROGRESS}>W trakcie</SelectItem>
                            <SelectItem value={TaskStatus.COMPLETED}>Zakończone</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Przycisk Usuń */}
                <Button variant="destructive" className="w-full sm:w-48 lg:w-48" onClick={() => onDelete(task?.id)}>
                    Usuń
                </Button>
            </div>
        </Card>
    );
};

export default TaskCard;
