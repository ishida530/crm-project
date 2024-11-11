import { useState } from "react";
import { useReactTable, ColumnFiltersState, ExpandedState, SortingState, VisibilityState, ColumnDef } from "@tanstack/react-table";
import { Project } from "../types";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";

export const useProjectTable = (data: Project[], columns: ColumnDef<Project>[]) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [expanded, setExpanded] = useState<ExpandedState>({});

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
        getCoreRowModel: getCoreRowModel(),
        onExpandedChange: setExpanded,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableColumnFilters: true,
        getRowCanExpand
    });

    return { table };
};