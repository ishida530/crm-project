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
import { ProjectGroup } from './types'; // Typ ProjectGroup
import { formSchema } from './validate';

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
            name: ''
        },
    });

    const onSubmit = (data: ProjectGroup) => {
        if (Object.keys(form.formState.errors).length !== 0) {
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
                    <DialogTitle>{initialValues ? "Edytuj Grupę Projektów" : "Utwórz Grupę Projektów"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Zaktualizuj dane grupy projektów." : "Wypełnij szczegóły, aby utworzyć nową grupę projektów."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
