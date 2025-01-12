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
import { Project } from "../types";
import { Link } from "react-router-dom";

interface ProjectTableProps {
    data: Project[];
    onEditProject: (project: Project) => void;
    onDeleteProject: (projectId: number) => void;
    onAddProject: () => void;
}

const ProjectTable = ({ data, onEditProject, onDeleteProject, onAddProject }: ProjectTableProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([]); // State to track sorting

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.filter((project) => {
            const matchesSearch =
                !searchInput ||
                project.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                project.investor_representative.toLowerCase().includes(searchInput.toLowerCase()) ||
                project.project_manager.toLowerCase().includes(searchInput.toLowerCase());

            return matchesSearch;
        });
    }, [searchInput, data]);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: "ID",
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: "Nazwa projektu",
            enableSorting: true,
        },
        {
            accessorKey: "investor_representative",
            header: "Przedstawiciel inwestora",
            enableSorting: true,
        },
        {
            accessorKey: "project_manager",
            header: "Menedżer projektu",
            enableSorting: true,
        },
        {
            id: "actions",
            header: "Akcje",
            cell: ({ row }: Project) => {
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
                            <DropdownMenuItem onClick={() => onEditProject(project)}>
                                <Link to={`/projects/${project.id}`}>Szczegóły projektu</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditProject(project)}>Edytuj projekt</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteProject(project.id)}
                                className="text-red-600"
                            >
                                Usuń projekt
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [onEditProject, onDeleteProject]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting, // Update sorting state when it changes
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full">
            {/* Pasek filtrów i przycisk dodawania */}
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj projekty..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                <Button variant="outline" onClick={onAddProject} className="ml-4">
                    Dodaj projekt
                </Button>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {/* Klik handler do sortowania */}
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
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
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

export default ProjectTable;
