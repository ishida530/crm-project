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
import {  formSchemaProject } from './validate'; // Zakładam, że odpowiednio skonfigurowano `formSchema`
import { Project } from './types';



interface ProjectFormProps {
    initialValues?: Project;
    onSave: (data: Project) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectFormModal = ({ initialValues, onSave, isOpen, onClose }: ProjectFormProps) => {
    const form = useForm<Project>({
        resolver: zodResolver(formSchemaProject),
        defaultValues: initialValues || { id: 0, name: '', deadline: '', investorRepresentative: '', projectManager: '' },
    });
    const onSubmit = (data: Project) => {
        console.log('Form submitted with data:', data);
        console.log('Form errors:', form.formState.errors)

        onSave(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialValues ? "Edytuj Projekt" : "Utwórz Projekt"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Wprowadź zmiany w projekcie." : "Wypełnij dane, aby utworzyć nowy projekt."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa Projektu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nazwa Projektu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Termin</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Termin" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="investorRepresentative"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Przedstawiciel Inwestora</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Przedstawiciel Inwestora" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="projectManager"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kierownik Projektu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kierownik Projektu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" className="w-full">
                                {initialValues ? "Zapisz zmiany" : "Utwórz Projekt"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectFormModal;
