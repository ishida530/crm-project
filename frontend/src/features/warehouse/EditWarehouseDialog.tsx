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
import { Warehouse } from './types'; // Typ magazynu
import { formSchema } from './validate';

interface EditWarehouseDialogProps {
    initialValues?: Warehouse | null | undefined;
    onSave: (updatedWarehouse: Warehouse) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditWarehouseDialog = ({ initialValues, onSave, isOpen, onClose }: EditWarehouseDialogProps) => {
    const form = useForm<Warehouse>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: '',
            address: '',
        },
    });

    const onSubmit = (data: Warehouse) => {
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
                    <DialogTitle>{initialValues ? "Edytuj magazyn" : "Utwórz magazyn"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Wprowadź zmiany w danych magazynu." : "Wypełnij dane, aby utworzyć nowy magazyn."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Pole nazwy magazynu */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa magazynu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nazwa magazynu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Pole address magazynu */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lokalizacja</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Adres magazynu" {...field} />
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

export default EditWarehouseDialog;
