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
import { formSchema } from './validate';
import { EventType } from './types';
import { Textarea } from '@/components/ui/textarea';

interface EventFormProps {
    initialValues: EventType;
    onSave: (data: EventType) => void;
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    onDelete:()=>void;
}

const EventFormModal = ({ initialValues, onSave, isOpen, onClose, isEdit,onDelete }: EventFormProps) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    });

    const formatDateForInput = (date: Date | undefined): string => {
        if (!date) return '';
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().slice(0, 16);
        return formattedDate;
    };
    const onSubmit = (data: EventType) => {
        console.log('Form Errors:', form.formState.errors);
        if (Object.keys(form.formState.errors).length > 0) {
            console.error('Błędy formularza:', form.formState.errors);
            return;
        }
        onSave(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialValues ? "Edytuj Wydarzenie" : "Dodaj Wydarzenie"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Wprowadź zmiany w wydarzeniu." : "Wypełnij dane, aby dodać nowe wydarzenie."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
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
                            name="start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data Rozpoczęcia</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            value={formatDateForInput(field.value)}
                                            onChange={field.onChange}
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
                            name="end"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data Zakończenia</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            value={formatDateForInput(field.value)}
                                            onChange={field.onChange}
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
                            <Button type="submit" className="w-full">
                                {initialValues ? "Zapisz zmiany" : "Dodaj Wydarzenie"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
                {isEdit &&
                    <Button type="submit" variant={'destructive'} className="w-full" onClick={onDelete}>
                        Usuń wydarzenie
                    </Button>
                }
            </DialogContent>
        </Dialog>
    );
};

export default EventFormModal;
