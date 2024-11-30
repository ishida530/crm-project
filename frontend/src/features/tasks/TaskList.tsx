import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusProperties } from "../projects/hooks/utils";
import { Task } from "../projects/types";

interface TaskListProps {
    tasks: Task[];
    onAddTask: () => void;
}

export default function TaskList({ tasks, onAddTask }: TaskListProps) {
    return (
        <tr>
            <td colSpan={5}>
                <div className="pl-4 space-y-4">
                    <div className="flex justify-between">
                        <strong className="text-lg font-semibold">Zadania:</strong>
                        <Button variant="outline" className="ml-4" onClick={onAddTask}>
                            Dodaj zadanie
                        </Button>
                    </div>
                    {tasks && tasks.length > 0 ? (
                        <div className="space-y-2">
                            {tasks.map(task => {
                                const { label, color } = getStatusProperties(task.status);
                                return (
                                    <Card key={task.id} className="border border-gray-200 rounded-lg shadow-sm bg-white">
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <span>{task.description}</span>
                                                <Badge variant={color}>{label}</Badge>
                                            </CardTitle>
                                            <CardDescription className="text-sm text-gray-500 mt-1">
                                                <span className="font-semibold">Data:</span> {new Date(task.date).toLocaleDateString("pl-PL")}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-gray-500">Brak zadań.</div>
                    )}
                </div>
            </td>
        </tr>
    );
}
