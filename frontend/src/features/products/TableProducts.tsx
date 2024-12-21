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
import { Product } from "../warehouse/types";
import { Link } from "react-router-dom";

interface TableProductsProps {
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
    products: Product[] | undefined;
    onAddProduct: () => void;
    showWarehouseColumn?: boolean;  // Nowy props do wyświetlania kolumny Magazyn
}

const TableProducts = ({
    products = [],
    onEditProduct,
    onDeleteProduct,
    onAddProduct,
    showWarehouseColumn = false,  // Odbieramy nowy props
}: TableProductsProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const [sorting, setSorting] = useState<SortingState>([]);

    const filteredData = useMemo(() => {
        return products.filter((product: Product) => {
            const matchesSearch =
                !searchInput ||
                product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                product.producer.toLowerCase().includes(searchInput.toLowerCase());

            return matchesSearch;
        });
    }, [searchInput, products]);

    const columns = useMemo(() => {
        const baseColumns = [
            {
                id: "id",  // Explicit id
                accessorKey: "id",
                header: "ID",
                enableSorting: true,
            },
            {
                id: "producer",  // Explicit id
                accessorKey: "producer",
                header: "Producent",
                enableSorting: true,
            },
            {
                id: "name",  // Explicit id
                accessorKey: "name",
                header: "Nazwa produktu",
                enableSorting: true,
            },
            {
                id: "quantity",  // Explicit id
                accessorKey: "quantity",
                header: "Ilość",
                enableSorting: true,
            },
            {
                id: "unitOfMeasure",  // Explicit id
                accessorKey: "unitOfMeasure",
                header: "Jednostka miary",
                enableSorting: true,
            },
        ];

        // Conditionally add warehouse column based on showWarehouseColumn
        if (showWarehouseColumn) {
            baseColumns.push({
                id: "warehouseName",  // Explicit id for warehouseName
                header: "Magazyn",  // Custom header for warehouse name
                cell: ({ row }: { row: any }) => {
                    const warehouseId = row.original.warehouseId;
                    const warehouseName = row.original.warehouseName;
                    if (warehouseId) {
                        return (
                            <Link to={`/warehouses/${warehouseId}`}>{warehouseName}</Link>
                        );
                    }
                    return "Brak magazynu";
                },
            });
        }

        if (!showWarehouseColumn) {
            baseColumns.push({
                id: "actions",  // Explicit id for actions
                header: "Akcje",
                cell: ({ row }: { row: any }) => {
                    const product = row.original;

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
                                <DropdownMenuItem onClick={() => onEditProduct(product)}>
                                    Edytuj produkt
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDeleteProduct(product.id)}
                                    className="text-red-600"
                                >
                                    Usuń produkt
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            });
        }

        return baseColumns;
    }, [onEditProduct, onDeleteProduct, showWarehouseColumn]);


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
                    placeholder="Filtruj produkty..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />

                {!showWarehouseColumn &&
                    <Button variant="outline" onClick={onAddProduct} className="ml-4">
                        Dodaj produkt
                    </Button>
                }
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {/* Kliknij, aby posortować */}
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

export default TableProducts;
