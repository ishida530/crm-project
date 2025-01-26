import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProjectGroup } from "./types"; // Assume you have such a type
import { Project, Task, TaskStatus } from "../projects/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditTask } from "../tasks/hooks/useEditTask";

interface ProjectGroupDetailsTableProps {
    data: ProjectGroup[];
    onEditProjectGroup: (projectGroup: ProjectGroup) => void;
    onDeleteProjectGroup: (projectGroupId: number) => void;
    onAddProjectGroup: () => void;
}

const ProjectGroupDetailsTable = ({
    data,
    onEditProjectGroup,
    onDeleteProjectGroup,
    onAddProjectGroup,
}: ProjectGroupDetailsTableProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const { mutate: editTask } = useEditTask();


    const { id } = useParams()
    const filteredData = useMemo(() => {
        // Ensure 'projects' is an array
        if (!Array.isArray(data.projects)) {
            console.error("Expected 'projects' to be an array, but got:", data.projects);
            return [];
        }


        // Flatten projects if nested in groups


        // Filter projects based on search input
        const filtered = data.projects.filter((project: Project) => {
            const matchesSearch =
                !searchInput ||
                [project.name, project.deadline, project.investor_representative, project.project_manager].some((value) => {
                    return value
                        ? value.toString().toLowerCase().includes(searchInput.toLowerCase())
                        : false;
                });

            return matchesSearch;
        });

        return filtered;
    }, [searchInput, data]);
    // Tworzenie kolumn zadania
    const taskColumns = useMemo(() => {
        return data?.project_template?.tasks.map((task: Task) => ({
            accessorKey: `task_${task.id}`,
            header: task.name,
            cell: ({ row }: { row: any }) => {
                const project = row.original;
                const taskInProject = project.tasks.find((t: Task) => t.name === task.name) as Task;

                if (!taskInProject) {
                    return <span className="text-gray-500">N/A</span>;
                }

                const taskStatus = taskInProject.status;

                const handleStatusChange = (task: Task, value: string) => {
                    const newStatus = value as TaskStatus;
                    const updatedTask = {
                        id: task.id,
                        project: task.project,
                        author: task.author,
                        ...task,
                        status: newStatus,
                    };
                    editTask(updatedTask);
                };

                const getStatusBackground = (status: TaskStatus) => {
                    switch (status) {
                        case TaskStatus.TO_DO:
                            return "bg-red-500";
                        case TaskStatus.IN_PROGRESS:
                            return "bg-orange-500";
                        case TaskStatus.COMPLETED:
                            return "bg-green-500";
                        default:
                            return "bg-gray-200";
                    }
                };

                return (
                    <Select
                        value={taskStatus} // Reflect status directly
                        onValueChange={(newStatus: TaskStatus) => handleStatusChange(taskInProject, newStatus)}
                    >
                        <SelectTrigger className={getStatusBackground(taskStatus)}>
                            <SelectValue placeholder={taskStatus.replace("_", " ")} />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(TaskStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status.replace("_", " ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            },
        }));
    }, [data]);

    // Definicja kolumn
    const columns = useMemo(
        () => [

            {
                accessorKey: "name", // Przechowuje nazwę projektu
                header: "Nazwa projektu",
                cell: ({ row }: { row: any }) => {

                    const project = row.original;
                    return project.name; // Zwraca nazwę projektu
                },
            },
            {
                accessorKey: "investor_representative", // Przechowuje przedstawiciela inwestora
                header: "Przedstawiciel inwestora",
                cell: ({ row }: { row: any }) => {
                    const project = row.original;
                    return project.investor_representative; // Zwraca przedstawiciela inwestora
                },
            },
            {
                accessorKey: "project_manager", // Przechowuje menedżera projektu
                header: "Menedżer projektu",
                cell: ({ row }: { row: any }) => {
                    const project = row.original;
                    return project.project_manager; // Zwraca menedżera projektu
                },
            },


            ...taskColumns, // Dodanie kolumn z zadaniami
            {
                id: "actions",
                header: "Akcje",
                cell: ({ row }: { row: any }) => {
                    console.log(row)
                    const projectGroup = row.original;
                    console.log(projectGroup)
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
                                <DropdownMenuItem onClick={() => onEditProjectGroup(projectGroup)}>
                                    <Link to={`/projects/${projectGroup.id}`}>Szczegóły projektów</Link>
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem onClick={() => onEditProjectGroup(projectGroup)}>Edytuj grupę projektów</DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        [taskColumns, onEditProjectGroup, onDeleteProjectGroup]
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj grupy projektów..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                {/* <Button variant="outline" onClick={onAddProjectGroup} className="ml-4">
                    Dodaj grupę projektów
                </Button> */}
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <Button
                                            variant="ghost"
                                            className="text-left"
                                            onClick={() => {
                                                table.getColumn(header.id)?.toggleSorting();
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </Button>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    Brak danych.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ProjectGroupDetailsTable;
