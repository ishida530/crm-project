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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import useGetProjectTemplates from '../projectsTemplates/hooks/useGetAllProjectTemplates'; // Hook do pobierania szablonów
import { formSchema } from './validate';
import { ProjectTemplate } from '../projectsTemplates/types';
import { ProjectGroup } from './types';

interface EditProjectGroupDialogProps {
    initialValues?: ProjectGroup;
    onSave: (updatedGroup: ProjectGroup) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditProjectGroupDialog = ({ initialValues, onSave, isOpen, onClose }: EditProjectGroupDialogProps) => {
    const form = useForm<ProjectGroup>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: '',
            project_template_id: '', // Dodanie pola dla szablonu projektu
        },
    });

    const { projectTemplates, isLoading } = useGetProjectTemplates(); // Hook do pobierania szablonów

    const onSubmit = (data: ProjectGroup) => {
        console.log('Form Submitted Data:', data);

        // Sprawdzamy czy project_template_id jest częścią danych
        if (!data.project_template_id) {
            console.error("No project_template_id in submitted data");
        }

        if (Object.keys(form.formState.errors).length !== 0) {
            console.error('Form errors:', form.formState.errors);
            return;
        }

        // Przesyłamy dane z formularza
        onSave(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialValues ? "Edytuj Grupę Projektów" : "Utwórz Grupę Projektów"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Zaktualizuj dane grupy projektów." : "Wypełnij szczegóły, aby utworzyć nową grupę projektów."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Nazwa grupy projektów */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa grupy projektów</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nazwa grupy projektów" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Szablon projektu */}
                        {!isLoading &&
                            <FormField
                                control={form.control}
                                name="project_template_id"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Szablon projektu</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value ? String(field.value) : ""} // Zawsze ustawiamy wartość, nawet jeśli jest pusta
                                                    onValueChange={(value) => {
                                                        console.log("Selected project_template_id:", value); // Logowanie wyboru
                                                        field.onChange(Number(value)); // Przekazujemy wartość jako liczbę
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Wybierz szablon projektu" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {projectTemplates?.map((template: ProjectTemplate) => (
                                                            <SelectItem key={template.id} value={String(template.id)}>
                                                                {template.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        }

                        <DialogFooter>
                            <Button type="submit" className="w-full">
                                Zapisz zmiany
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProjectGroupDialog;
