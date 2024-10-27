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
import { User } from './types';
import { z } from 'zod';

interface EditUserDialogProps {
    initialValues?: User;
    onSave: (updatedProfile: User) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditUserDialog = ({ initialValues, onSave, isOpen, onClose }: EditUserDialogProps) => {


 
    
    const form = useForm<User>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || { name: 'asd', email: 'asa@wp.pl', phoneNumber: '443', role: 'USER' },
    });

    const onSubmit = (data: {
        email: string;
        name: string;
        phoneNumber: string;
        role: string;
    }) => {
        console.log('onSubmit został wywołany z danymi:', data);
        console.log('Błędy formularza:', form.formState.errors);

        if (Object.keys(form.formState.errors).length > 0) {
            console.error('Błędy formularza:', form.formState.errors);
            return;
        }
        console.log(data)
        onSave(data);
        onClose();
    };
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialValues ? "Edytuj Użytkownika" : "Utwórz Użytkownika"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Wprowadź zmiany w profilu użytkownika." : "Wypełnij dane, aby utworzyć nowego użytkownika."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imię i Nazwisko</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Imię i Nazwisko" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numer Telefonu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Numer Telefonu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rola</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rola" {...field} />
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

export default EditUserDialog;
