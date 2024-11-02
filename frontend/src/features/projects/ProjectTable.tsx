import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    ExpandedState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
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
import { Input } from "@/components/ui/input";
import { Project, Task } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusProperties } from "./hooks/utils";

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
    },
    {
        accessorKey: "projectManager",
        header: "Menedżer projektu",
        cell: ({ row }) => <div>{row.getValue("projectManager")}</div>,
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id.toString())}>
                            Kopiuj ID projektu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Wyświetl szczegóły projektu</DropdownMenuItem>
                        <DropdownMenuItem>Zarządzaj zadaniami</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

interface ProjectTableProps {
    data: Project[];
}

export default function ProjectTable({ data }: ProjectTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [expanded, setExpanded] = React.useState<ExpandedState>({});

    const getRowCanExpand = () => true;

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onExpandedChange: setExpanded,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        getRowCanExpand,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj projekty..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
                    className="max-w-sm"
                />
                <Button variant="outline" className="ml-4" onClick={() => { console.log('dodaj projekt') }}>
                    Dodaj projekt
                </Button>
            </div>
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
                                <React.Fragment key={row.id}>
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
                                                    <strong className="text-lg font-semibold">Zadania:</strong>
                                                    {row.original.tasks && row.original.tasks.length > 0 ? (
                                                        <div className="space-y-2">
                                                            {row.original.tasks.map((task) => {
                                                                const { label, color } = getStatusProperties(task.status);
                                                          

                                                                return (
                                                                    <Card key={task.id} className="border border-gray-200 rounded-lg shadow-sm bg-white">
                                                                        <CardHeader>
                                                                            <CardTitle className="flex justify-between items-center">
                                                                                <span>{task.description}</span>
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
                                </React.Fragment>
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
        </div>
    );
}
