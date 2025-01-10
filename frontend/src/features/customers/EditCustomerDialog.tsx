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
import { formSchema } from './validate';
import { Customer } from './types';
import useGetAllCustomersGroup from '../customerGroup/hooks/useGetAllCustomerGroup';
import { CustomerGroup } from '../customerGroup/types';

interface EditCustomerDialogProps {
    initialValues?: Customer | null | undefined;
    onSave: (updatedProfile: Customer) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditCustomerDialog = ({ initialValues, onSave, isOpen, onClose }: EditCustomerDialogProps) => {
    // Initialize the form with default values
    console.log(initialValues)
    const form = useForm<Customer>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            contact_name: '',
            email: '',
            address: '',
            nip: '',
            website: '',
            group: '', 
        },
    });

    const { customersGroup } = useGetAllCustomersGroup();

    const onSubmit = (data: Customer) => {
        // If there are form errors, prevent submission
        if (Object.keys(form.formState.errors).length !== 0) {
            console.error('Form errors:', form.formState.errors);
            return;
        }
        // Save the data and close the dialog
        onSave(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialValues ? "Edit Customer" : "Create Customer"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Make changes to the customer's profile." : "Fill in the details to create a new customer."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Contact Name Field */}
                        <FormField
                            control={form.control}
                            name="contact_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
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

                        {/* Address Field */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* NIP Field */}
                        <FormField
                            control={form.control}
                            name="nip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NIP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="NIP" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Website Field */}
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Website" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Group Field */}
                        <FormField
                            control={form.control}
                            name="group"
                            render={({ field }) => {
                                let groupId;
                                // Jeśli value jest obiektem (zawiera id grupy), to przypisz id grupy jako string
                                if (field.value && typeof field.value === 'object' && field.value?.id !== null) {
                                    groupId = field.value?.id?.toString();  // Przekształcamy id do stringa
                                } else {
                                    groupId = field.value?.toString();  // Jeżeli wartość jest już liczbą, traktujemy ją jako string
                                }
                                return (
                                    <FormItem>
                                        <FormLabel>Group</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={groupId ?? ""}  // Convert to string for the select value
                                                onValueChange={(value) => field.onChange(Number(value))}  // Convert to number before submitting
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a group" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {customersGroup?.map((group: CustomerGroup) => (
                                                        group.id !== undefined ? (
                                                            <SelectItem key={group.id} value={group.id.toString()}>
                                                                {group.name}
                                                            </SelectItem>
                                                        ) : null
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <DialogFooter>
                            <Button type="submit" className="w-full">
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCustomerDialog;
