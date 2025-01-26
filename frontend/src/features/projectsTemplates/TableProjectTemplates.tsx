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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import Select component
import { ProjectTemplate } from './types';
import { Link } from "react-router-dom";
import useGetProjectTemplateDetails from "./hooks/useGetProjectTemplateDetails";

interface TableProjectTemplatesProps {
    onEditProjectTemplate: (projectTemplate: ProjectTemplate) => void;
    onDeleteProjectTemplate: (projectTemplateId: number) => void;
    projectTemplates: ProjectTemplate[] | undefined;
    onAddProjectTemplate: () => void;
}

const TableProjectTemplates = ({ projectTemplates = [], onEditProjectTemplate, onDeleteProjectTemplate, onAddProjectTemplate }: TableProjectTemplatesProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string>("all");
    const [sorting, setSorting] = useState<SortingState>([]); // State to track sorting

    const filteredData = useMemo(() => {
        return projectTemplates.filter((projectTemplate: ProjectTemplate) => {
            const matchesSearch =
                !searchInput ||
                projectTemplate.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                projectTemplate.description.toLowerCase().includes(searchInput.toLowerCase());

            const matchesGroup =
                selectedGroup === "all" || projectTemplate.group?.name.toLowerCase() === selectedGroup.toLowerCase();

            return matchesSearch && matchesGroup;
        });
    }, [searchInput, projectTemplates, selectedGroup]);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: "ID",
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: "Nazwa szablonu",
            enableSorting: true,
        },
        {
            accessorKey: "description",
            header: "Opis",
            enableSorting: true,
        },
        {
            id: "actions",
            header: "Akcje",
            cell: ({ row }: ProjectTemplate) => {
                const projectTemplate = row.original;

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
                            <DropdownMenuItem>

                                <Link
                                    to={`/projects/templates/${projectTemplate.id}`}
                                >
                                    Szczegóły szablonu
                                </Link>

                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditProjectTemplate(projectTemplate)}>
                                Edytuj szablon
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteProjectTemplate(projectTemplate.id)}
                                className="text-red-600"
                            >
                                Usuń szablon
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [onEditProjectTemplate, onDeleteProjectTemplate]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting, // Update sorting state when it changes
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // Get unique groups for the select options
    const groups = useMemo(() => {
        const groupNames = new Set(projectTemplates.map((projectTemplate) => projectTemplate.group?.name).filter(Boolean));
        return Array.from(groupNames);
    }, [projectTemplates]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj szablony projektów..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                {/* Add Select filter for groups */}

                <Button variant="outline" onClick={onAddProjectTemplate} className="ml-4">
                    Dodaj szablon
                </Button>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {/* Click handler for sorting */}
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

export default TableProjectTemplates;
