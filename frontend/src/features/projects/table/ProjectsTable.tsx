import { Fragment, useState } from "react";
import {
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Project, Task, TaskStatus } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusProperties } from "../hooks/utils";
import TaskFormModal from '../TaskFormModal';
import ProjectFilter from "./ProjectFilter";
import { useProjectTable } from "../hooks/useProjectTable";
import { useCreateTask } from "../hooks/useCreateTask";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useEditTask } from "../hooks/useEditTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import DeleteTaskAlertDialog from "../DeleteTaskAlertDialog";

interface ProjectTableProps {
    data: Project[];
    onAddProject: () => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (projectId: number) => void;
}

export default function ProjectTable({ data, onAddProject, onEditProject, onDeleteProject }: ProjectTableProps) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [initialTaskData, setInitialTaskData] = useState<Task | undefined>(undefined);
    const [projectId, setProjectId] = useState<number | undefined>(undefined);
    const [taskId, setTaskId] = useState<number | undefined>(undefined);
    const { mutate: createTask } = useCreateTask();
    const { mutate: editTask } = useEditTask();
    const { mutate: deleteTask } = useDeleteTask(); // Hook for deleting task

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
            enableSorting: false,
        },
        {
            accessorKey: "name",
            header: "Nazwa projektu",
            cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
            filterFn: 'includesString',
        },
        {
            accessorKey: "deadline",
            header: "Termin",
            cell: ({ row }) => <div>{new Date(row.getValue("deadline")).toLocaleDateString("pl-PL")}</div>,
        },
        {
            accessorKey: "investorRepresentative",
            header: "Przedstawiciel inwestora",
            cell: ({ row }) => <div>{row.getValue("investorRepresentative")}</div>,
            filterFn: 'includesString',
        },
        {
            accessorKey: "projectManager",
            header: "Menedżer projektu",
            cell: ({ row }) => <div>{row.getValue("projectManager")}</div>,
            filterFn: 'includesString',
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const project = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Otwórz menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEditProject(project)}>Edytuj projekt</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDeleteProject(project.id)}>Usuń projekt</DropdownMenuItem>
                            <DropdownMenuItem>Wyświetl szczegóły projektu</DropdownMenuItem>
                            <DropdownMenuItem>Zarządzaj zadaniami</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    const { table } = useProjectTable(data, columns);

    const handleAddTask = (id: number) => {
        setProjectId(id);
        setInitialTaskData(undefined);
        setIsTaskFormOpen(true);
    };

    const handleSaveTask = (taskData: Task) => {
        if (initialTaskData) {
            const updatedTask = {
                id: initialTaskData.id,
                project: initialTaskData.project,
                ...taskData
            }
            editTask(updatedTask);
        } else {
            createTask({ project: projectId, ...taskData });
        }
        setInitialTaskData(undefined);
        setIsTaskFormOpen(false);
    };

    const handleEditTask = (task: Task) => {
        setInitialTaskData(task);
        setIsTaskFormOpen(true);
    };

    const handleChangeStatus = (task: Task, newStatus: TaskStatus) => {
        const updatedTask = { ...task, status: newStatus };
        editTask(updatedTask);
    };
    const handleDeleteConfirm = () => {
        console.log(taskId)
        if (taskId) deleteTask(taskId)
        setIsOpenDeleteModal(false);
    };


    const handleDeleteTask = async (taskId: number) => {
        setTaskId(taskId);
        setIsOpenDeleteModal(true);
    };

    return (
        <div className="w-full">
            <ProjectFilter onAddProject={onAddProject} table={table} />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <TableRow className="w-full hover:cursor-pointer" onClick={row.getToggleExpandedHandler()}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="w-full">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {row.getIsExpanded() ? (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <div className="pl-4 space-y-4">
                                                    <div className="flex justify-between">
                                                        <strong className="text-lg font-semibold">Zadania:</strong>
                                                        <Button variant="outline" className="ml-4" onClick={() => handleAddTask(row.original.id)}>
                                                            Dodaj zadanie
                                                        </Button>
                                                    </div>
                                                    {row.original.tasks && row.original.tasks.length > 0 ? (
                                                        <div className="space-y-2">
                                                            {row.original.tasks.map((task) => {
                                                                const { label, color } = getStatusProperties(task.status);
                                                                const taskWithProjectId = { ...task, project: row.original.id }
                                                                return (
                                                                    <Card key={task.id} className="border border-gray-200 rounded-lg shadow-sm bg-white">
                                                                        <CardHeader>
                                                                            <CardTitle className="flex justify-between items-center">
                                                                                <div className="flex flex-col gap-2">
                                                                                    <strong>{task.name}</strong>
                                                                                    <span>{task.description}</span>
                                                                                </div>
                                                                                <Badge variant={color}>{label}</Badge>
                                                                            </CardTitle>
                                                                            <CardDescription className="text-sm text-gray-500 mt-1">
                                                                                <span className="font-semibold">Data:</span>{" "}
                                                                                {new Date(task.date).toLocaleDateString("pl-PL")}
                                                                            </CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                            <p className="text-sm text-gray-500">
                                                                                <span className="font-semibold">Autor:</span> {task.author}
                                                                            </p>
                                                                            <div className="flex justify-end space-x-2 mt-2">
                                                                                <Button variant={"outline"} onClick={() => handleEditTask(taskWithProjectId)}>
                                                                                    Edytuj
                                                                                </Button>
                                                                                <div className="flex items-center">
                                                                                    <Select
                                                                                        defaultValue={task.status}
                                                                                        onValueChange={(newStatus: TaskStatus) => handleChangeStatus(taskWithProjectId, newStatus)}
                                                                                    >
                                                                                        <SelectTrigger className="w-[180px]">
                                                                                            <span>Zmień status</span>
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectItem value={TaskStatus.TO_DO}>Oczekujące</SelectItem>
                                                                                            <SelectItem value={TaskStatus.IN_PROGRESS}>W trakcie</SelectItem>
                                                                                            <SelectItem value={TaskStatus.COMPLETED}>Zakończone</SelectItem>

                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                </div>
                                                                                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                                                                                    Usuń
                                                                                </Button>
                                                                            </div>
                                                                        </CardContent>
                                                                    </Card>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-500">Brak zadań dla tego projektu.</p>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : null}
                                </Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Brak wyników.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} z {table.getFilteredRowModel().rows.length} wierszy zaznaczonych.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Poprzednia
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Następna
                    </Button>
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


        </div>
    );
}
