import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema } from "./validate";
import { EventType } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

interface EventFormProps {
    initialValues: EventType | null;
    onSave: (data: EventType) => void;
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    onDelete: () => void;
}

const EventFormModal = ({ initialValues, onSave, isOpen, onClose, isEdit, onDelete }: EventFormProps) => {
    // Funkcja formatująca datę na 'YYYY-MM-DD HH:mm:ss'
    const formatDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formattedInitialValues = initialValues
        ? {
            ...initialValues,
            name: initialValues.name,
            description: initialValues.description,
            start_date: initialValues?.startDate
                ? formatDateTime(new Date(initialValues.startDate))
                : "",
            end_date: initialValues.endDate
                ? formatDateTime(new Date(initialValues.endDate))
                : "",
        }
        : null;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: formattedInitialValues || {
            name: "",
            start_date: formatDateTime(new Date()), // Aktualna data
            end_date: formatDateTime(new Date(new Date().getTime() + 30 * 60 * 1000)), // Data 30 minut później
            description: "",
        },
    });

    const handleDateChange = (dateString: string, field: string) => {
        const parsedDate = new Date(dateString);
        const formattedDate = formatDateTime(parsedDate); // Konwertujemy na format 'YYYY-MM-DD HH:mm:ss'
        form.setValue(field, formattedDate); // Ustawiamy nową wartość w formularzu
    };

    const onSubmit = (data: EventType) => {
        onSave(data); // Przekazujemy dane po sformatowaniu
    };

    const confirmAndDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
            onDelete();
        }
    };

    useEffect(() => {
        console.log('formattedInitialValues', formattedInitialValues)
        console.log(initialValues);
    }, [initialValues]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{!initialValues ? "Dodaj Wydarzenie" : "Edytuj Wydarzenie"}</DialogTitle>
                    <DialogDescription>
                        {!initialValues
                            ? "Wypełnij dane, aby dodać nowe wydarzenie."
                            : "Wprowadź zmiany w wydarzeniu."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tytuł</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tytuł" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data Rozpoczęcia</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            value={field.value ? field.value.replace(" ", "T") : ""}
                                            onChange={(e) => handleDateChange(e.target.value, field.name)}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data Zakończenia</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            value={field.value ? field.value.replace(" ", "T") : ""}
                                            onChange={(e) => handleDateChange(e.target.value, field.name)}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Opis</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Opis" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={!form.formState.isValid}
                            >
                                {initialValues ? "Zapisz zmiany" : "Dodaj Wydarzenie"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
                {isEdit && (
                    <Button
                        type="button"
                        variant="destructive"
                        className="w-full"
                        onClick={confirmAndDelete}
                    >
                        Usuń wydarzenie
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EventFormModal;
