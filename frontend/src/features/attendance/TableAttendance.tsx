import React, { useState, useMemo, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useGetFilteredAttendances from "./hooks/useGetFilteredAttendances";
import { Attendance, Status as StatusTypes } from "./types";
import { Loader } from "@/components/ui/loader";


interface TableAttendanceProps {
    onEditAttendance: ({ id: number, newStatus: string }) => void;
    onDeleteAttendance: (attendanceId: number) => void;
    onAddAttendance: () => void;
    attendances?: Attendance[];
    onChangeSelectValue: (attendance: Attendance) => void
}

const TableAttendance: React.FC<TableAttendanceProps> = ({
    // attendances: attendances_tru,
    onChangeSelectValue,
    onEditAttendance,
    onDeleteAttendance,
    onAddAttendance,
}) => {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");

    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedWeek, setSelectedWeek] = useState<number>(1);

    const { attendances: fetchedAttendances, error, isLoading } = useGetFilteredAttendances({
        month: selectedMonth + 1,
        weekNumber: selectedWeek,
    });
    const statusMap: Record<string, string> = {
        "PRESENT": "Obecny",
        "VACATION": "Urlop",
        "SICK_LEAVE": "L4",
        "ABSENT": "Nieobecny",
        "BEREAVEMENT": "Żałoba"
    };

    const transformData = (data: Attendance[]): Attendance[] => {
        if (!data || !Array.isArray(data)) return [];
        return data
            .map((entry) => {
                const days: Record<string, string> = {};

                if (entry.attendances && Array.isArray(entry.attendances)) {
                    entry.attendances.forEach((status) => {
                        const date = new Date(status.date);
                        const formattedDate = date.toLocaleDateString("pl-PL", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        });
                        days[formattedDate] = status.status;
                        days["attendance_id"] = status.attendance_id;
                    });
                }

                return { ...entry, days };
            })
            .sort((a, b) => a.user_id - b.user_id); // Sort data by user_id or any other field
    };

    useEffect(() => {
        setAttendances(transformData(fetchedAttendances));
    }, [fetchedAttendances]);

    // Funkcja generująca numerację tygodni w miesiącu
    const generateWeeksInMonth = (month: number) => {
        const firstDayOfMonth = new Date(new Date().getFullYear(), month, 1);
        const lastDayOfMonth = new Date(new Date().getFullYear(), month + 1, 0);

        const weeks: number[] = [];

        // Iteruj po dniach miesiąca i przypisuj numery tygodni
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const currentDate = new Date(new Date().getFullYear(), month, day);
            const currentWeekNumber = Math.ceil((currentDate.getDate() + 6 - currentDate.getDay()) / 7);

            if (!weeks.includes(currentWeekNumber)) {
                weeks.push(currentWeekNumber);
            }
        }

        return weeks;
    };

    const generateDays = useMemo(() => {
        const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 1);
        const daysInMonth = new Date(firstDayOfMonth.getFullYear(), selectedMonth + 1, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(firstDayOfMonth.getFullYear(), selectedMonth, i + 1);
            const week = Math.ceil((i + 1) / 7); // Numer tygodnia w miesiącu
            return {
                day: date.getDate(),
                week,
                name: date.toLocaleDateString("pl-PL", { weekday: "short" }),
                formatted: date.toLocaleDateString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
            };
        });

        // Filtrujemy dni, aby pasowały tylko do wybranego tygodnia
        return days.filter((day) => day.week === selectedWeek);
    }, [selectedMonth, selectedWeek]);

    const filteredAttendances = useMemo(() => {
        if (!searchInput) return attendances;
        return attendances.filter((attendance) =>
            attendance.user_name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [attendances, searchInput]);

    const columns = useMemo(() => {
        const dayColumns = generateDays.map(({ day, name, formatted }) => ({
            id: `day-${day}`,
            header: (
                <div className="text-center">
                    {name}
                    <br />
                    <span className="text-sm text-gray-500">{formatted}</span>
                </div>
            ),
            cell: ({ row }: any) => {
                const attendance = row.original;
                const dayStatus = attendance.attendances.find(
                    (status) => {
                        const statusDate = new Date(status.date).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" });
                        return statusDate === formatted;
                    }
                )?.status || "";
                return (
                    <Select
                        value={dayStatus}
                        onValueChange={(value) => {
                            const updatedAttendance = {
                                ...attendance,
                                attendances: attendance.attendances.map((status) => {
                                    const statusDate = new Date(status.date).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" });
                                    if (statusDate === formatted) {
                                        return { ...status, status: value };
                                    }
                                    return status;
                                }),
                            };


                            if (!dayStatus) {
                                console.log('formatted', formatted);

                                const [day, month, year] = formatted.split('.');
                                const correctDate = new Date(`${year}-${month}-${day}`);

                                onChangeSelectValue({
                                    user_id: attendance.user_id,
                                    attendances: [{
                                        status: StatusTypes[value as keyof typeof StatusTypes],
                                        date: correctDate.toISOString().split('T')[0] // Using correct date here
                                    }]
                                });
                            } else {
                                onEditAttendance({ id: attendance.days.attendance_id, newStatus: value });
                            }




                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(statusMap).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {statusMap[status]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            },
        }));

        return [
            { accessorKey: "user_id", header: "ID" },
            { accessorKey: "user_name", header: "Imię" },
            ...dayColumns,
        ];
    }, [generateDays, statusMap, onEditAttendance]);

    const table = useReactTable({
        data: filteredAttendances,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    if (isLoading) {
        return <Loader isVisible />;
    }
    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Szukaj pracowników..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                <Button variant="outline" onClick={onAddAttendance}>
                    Dodaj pracownika
                </Button>
            </div>

            <div className="flex space-x-4">
                <Select
                    value={selectedMonth.toString()}
                    onValueChange={(value) => setSelectedMonth(Number(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Wybierz miesiąc" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }, (_, index) => (
                            <SelectItem key={index} value={index.toString()}>
                                {new Date(2023, index).toLocaleString("pl-PL", { month: "long" })}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={selectedWeek.toString()}
                    onValueChange={(value) => setSelectedWeek(Number(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Wybierz tydzień" />
                    </SelectTrigger>
                    <SelectContent>
                        {generateWeeksInMonth(selectedMonth).map((week) => (
                            <SelectItem key={week} value={week.toString()}>
                                Tydzień {week}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="overflow-x-auto rounded-md border mt-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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

export default TableAttendance;