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
import { User, UserRole, userRoles } from './types'; 

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditUserDialogProps {
    initialValues?: User;
    onSave: (updatedProfile: User) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditUserDialog = ({ initialValues, onSave, isOpen, onClose }: EditUserDialogProps) => {

    const form = useForm<User>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || { name: '', email: '', phoneNumber: '', role: UserRole.EMPLOYEE },
    });

    const onSubmit = (data: User) => {
        if (Object.keys(form.formState.errors).length != 0) {
            console.error('Błędy formularza: ', form.formState.errors);
            return;
        }
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
                                    <FormLabel>Imię i nazwisko</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Imię i nazwisko" {...field} />
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
                                    <FormLabel>Adres e-mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Adres e-mail" {...field} />
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
                                    <FormLabel>Numer telefonu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Numer telefonu" {...field} />
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Wybierz rolę" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {userRoles.map(({ role, title }) => (
                                                    <SelectItem key={role} value={role}>
                                                        {title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
