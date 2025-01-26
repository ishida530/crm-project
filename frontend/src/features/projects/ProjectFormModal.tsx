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
import { formSchemaProject } from './validate';
import { Project } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useGetAllProjectTemplates from '../projectsTemplates/hooks/useGetAllProjectTemplates';
import { ProjectTemplate } from '../projectsTemplates/types';
import useGetAllProjectGroups from '../projectGroup/hooks/useGetAllProjectGroups';
import { ProjectGroup } from '../projectGroup/types';



interface ProjectFormProps {
    initialValues?: Project;
    onSave: (data: Project) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectFormModal = ({ initialValues, onSave, isOpen, onClose }: ProjectFormProps) => {


    const { projectTemplates, isLoading: isLoadingTemplates, } = useGetAllProjectTemplates()
    const { projectGroups, isLoading: isLoadingGroup } = useGetAllProjectGroups()
    const form = useForm<Project>({
        resolver: zodResolver(formSchemaProject),
        defaultValues: initialValues || { id: 0, name: '', deadline: '', investor_representative: '', project_manager: '', project_template_id: "", group_id: 0 },
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
                            name="investor_representative"
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
                            name="project_manager"
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
                        {
                            !initialValues && !isLoadingTemplates &&
                            <FormField
                                control={form.control}
                                name="project_template_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Szablon projektu</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value?.toString() || ""}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Wybierz szablon projektu" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {projectTemplates.map((projectTemplate: ProjectTemplate) => (
                                                        <SelectItem
                                                            key={projectTemplate.id}
                                                            value={String(projectTemplate.id)}
                                                        >
                                                            {projectTemplate.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        }
                        {
                            !initialValues && !isLoadingGroup &&
                            <FormField
                                control={form.control}
                                name="group_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grupa projektu</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value?.toString() || ""}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Wybierz grupe projektu" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {projectGroups.map((projectGroup: ProjectGroup) => (
                                                        <SelectItem
                                                            key={projectGroup.id}
                                                            value={String(projectGroup.id)}
                                                        >
                                                            {projectGroup.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        }


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
