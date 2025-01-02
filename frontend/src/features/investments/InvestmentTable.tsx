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
import { Link } from "react-router-dom";
import { Investment } from "./types";

interface InvestmentTableProps {
    data: Investment[];
    onEditInvestment: (investment: Investment) => void;
    onDeleteInvestment: (investmentId: number) => void;
    onAddInvestment: () => void;
}

const InvestmentTable = ({ data, onEditInvestment, onDeleteInvestment, onAddInvestment }: InvestmentTableProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([]); // Initialize sorting state

    const filteredData = useMemo(() => {
        return data.filter((investment) => {
            const matchesSearch =
                !searchInput ||
                Object.values(investment).some((value) =>
                    value
                        ? value.toString().toLowerCase().includes(searchInput.toLowerCase())
                        : false
                );

            return matchesSearch;
        });
    }, [searchInput, data]);

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "name", header: "Nazwa inwestycji", enableSorting: true },
        { accessorKey: "contract_signing_date", header: "Data podpisania umowy", enableSorting: true },
        { accessorKey: "completion_deadline", header: "Termin realizacji", enableSorting: true },
        { accessorKey: "contract_annex", header: "Załącznik do umowy", enableSorting: true },
        { accessorKey: "notes", header: "Uwagi", enableSorting: true },
        { accessorKey: "construction_site_contact", header: "Kontakt na budowie", enableSorting: true },
        { accessorKey: "responsible_person", header: "Osoba odpowiedzialna", enableSorting: true },
        { accessorKey: "supervision_inspector", header: "Inspektor nadzoru", enableSorting: true },
        { accessorKey: "journal_registration", header: "Rejestracja w dzienniku", enableSorting: true },
        { accessorKey: "work_start_notification", header: "Powiadomienie o rozpoczęciu prac", enableSorting: true },
        { accessorKey: "construction_board", header: "Tablica budowy", enableSorting: true },
        { accessorKey: "building_project_minor_changes", header: "Zmiany w projekcie budowlanym", enableSorting: true },
        { accessorKey: "execution_project", header: "Projekt wykonawczy", enableSorting: true },
        { accessorKey: "string_design", header: "Projekt stringu", enableSorting: true },
        { accessorKey: "medium_voltage_connection_scope", header: "Zakres połączenia średniego napięcia", enableSorting: true },
        { accessorKey: "acceptance_protocol", header: "Protokół odbioru", enableSorting: true },
        { accessorKey: "osd_acceptance_documentation", header: "Dokumentacja OSD", enableSorting: true },
        { accessorKey: "client_acceptance_documentation", header: "Dokumentacja akceptacji klienta", enableSorting: true },
        { accessorKey: "power_plant_connection", header: "Połączenie z elektrownią", enableSorting: true },
        { accessorKey: "psp_notification", header: "Powiadomienie PSP", enableSorting: true },
        { accessorKey: "pinb_notification", header: "Powiadomienie PINB", enableSorting: true },
        { accessorKey: "surveyor_stakeout", header: "Wytyczenie przez geodetę", enableSorting: true },
        { accessorKey: "surveyor_inventory", header: "Inwentaryzacja przez geodetę", enableSorting: true },
        { accessorKey: "fence_delivery", header: "Dostawa ogrodzenia", enableSorting: true },
        { accessorKey: "fence_construction", header: "Budowa ogrodzenia", enableSorting: true },
        { accessorKey: "site_security", header: "Bezpieczeństwo na terenie budowy", enableSorting: true },
        { accessorKey: "structure_delivery", header: "Dostawa konstrukcji", enableSorting: true },
        { accessorKey: "piling", header: "Pale", enableSorting: true },
        { accessorKey: "structure_assembly", header: "Montaż konstrukcji", enableSorting: true },
        { accessorKey: "module_delivery", header: "Dostawa modułów", enableSorting: true },
        { accessorKey: "module_installation", header: "Montaż modułów", enableSorting: true },
        { accessorKey: "assembly_materials", header: "Materiały do montażu", enableSorting: true },
        { accessorKey: "ac_wiring_routes", header: "Trasy okablowania AC", enableSorting: true },
        { accessorKey: "dc_wiring_routes", header: "Trasy okablowania DC", enableSorting: true },
        { accessorKey: "medium_voltage_wiring_routes", header: "Trasy okablowania średniego napięcia", enableSorting: true },
        { accessorKey: "transformer_station", header: "Stacja transformatorowa", enableSorting: true },
        { accessorKey: "telematics", header: "Telemechanika", enableSorting: true },
        { accessorKey: "cctv", header: "Monitoring CCTV", enableSorting: true },
        { accessorKey: "equipotential_connections", header: "Połączenia wyrównania potencjałów", enableSorting: true },
        {
            id: "actions",
            header: "Akcje",
            cell: ({ row }: { row: any }) => {
                const investment = row.original;
console.log(investment)
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
                            <DropdownMenuItem onClick={() => onEditInvestment(investment)}>
                                <Link to={`/investments/${investment.id}`}>Szczegóły inwestycji</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditInvestment(investment)}>Edytuj inwestycję</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteInvestment(investment.id)}
                                className="text-red-600"
                            >
                                Usuń inwestycję
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [onEditInvestment, onDeleteInvestment]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting, // Now setSorting is defined
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj inwestycje..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                <Button variant="outline" onClick={onAddInvestment} className="ml-4">
                    Dodaj inwestycję
                </Button>
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

export default InvestmentTable;
