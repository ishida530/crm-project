import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formSchemaTask } from '../projects/validate';
import { Task, TaskStatus } from '../projects/types';

interface TaskFormProps {
    initialValues?: Task | null;
    onSave: (data: Task) => void;
    isOpen: boolean;
    onClose: () => void;
    isTemplate: boolean
}

const TaskFormModal = ({ isTemplate = false, initialValues, onSave, isOpen, onClose }: TaskFormProps) => {
    const form = useForm<Task>({
        resolver: zodResolver(formSchemaTask),
        defaultValues: {
            ...initialValues,
            start_date: initialValues?.start_date
                ? new Date(initialValues.start_date).toISOString().split('T')[0] // Format for date input
                : '', // Ensure it's empty if no initial value
        },
    });

    const onSubmit = (data: Task) => {
        // Ensure start_date is in the correct format (if necessary)
        const formattedData = {
            ...data,
            status: isTemplate ? TaskStatus.TO_DO : data.status,
            start_date: isTemplate ? null : new Date(data?.start_date).toISOString().split('T')[0], // Format to YYYY-MM-DD
        };

        console.log('Form submitted with data:', formattedData);
        console.log('Form errors:', form.formState.errors);

        if (Object.keys(form.formState.errors).length > 0) {
            console.error('Form errors:', form.formState.errors);
            return;
        }

        onSave(formattedData); // Call the save function with formatted data
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialValues ? "Edytuj Zadanie" : "Dodaj Zadanie"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Wprowadź zmiany w zadaniu." : "Wypełnij dane, aby dodać nowe zadanie."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa Zadania</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nazwa Zadania" {...field} />
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
                                        <Input placeholder="Opis" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!isTemplate &&
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value as TaskStatus)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Wybierz status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={TaskStatus.TO_DO}>Do Zrobienia</SelectItem>
                                                    <SelectItem value={TaskStatus.IN_PROGRESS}>W Trakcie</SelectItem>
                                                    <SelectItem value={TaskStatus.COMPLETED}>Zakończone</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        {!isTemplate && <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        <DialogFooter>
                            <Button type="submit" className="w-full">
                                {initialValues ? "Zapisz zmiany" : "Dodaj Zadanie"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskFormModal;
