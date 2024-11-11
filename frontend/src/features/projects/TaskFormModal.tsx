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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Zakładam, że Select został poprawnie zaimportowany z Twojej biblioteki UI
import { formSchemaTask } from './validate'; // Zakładam, że odpowiednio skonfigurowano `formSchema` dla `Task`.
import { Task, TaskStatus } from './types';



interface TaskFormProps {
    initialValues?: Task | null;
    onSave: (data: Task) => void;
    isOpen: boolean;
    onClose: () => void;
}

const TaskFormModal = ({ initialValues, onSave, isOpen, onClose }: TaskFormProps) => {
    const form = useForm<Task>({
        resolver: zodResolver(formSchemaTask),
        defaultValues: initialValues || { description: '', status: TaskStatus.TO_DO, author: '', date: '', name: '' },
    });
    const onSubmit = (data: Task) => {
        console.log('Form submitted with data:', data);
        console.log('Form errors:', form.formState.errors);

        if (Object.keys(form.formState.errors).length > 0) {
            console.error('Form errors:', form.formState.errors);
            return;
        }
        onSave(data);
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
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Autor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Autor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
