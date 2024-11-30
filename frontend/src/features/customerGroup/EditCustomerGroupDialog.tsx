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
import { CustomerGroup } from './types'; // Typ CustomerGroup
import { formSchema } from './validate';

interface EditCustomerGroupDialogProps {
    initialValues?: CustomerGroup;
    onSave: (updatedGroup: CustomerGroup) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditCustomerGroupDialog = ({ initialValues, onSave, isOpen, onClose }: EditCustomerGroupDialogProps) => {
    const form = useForm<CustomerGroup>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: ''
        },
    });

    const onSubmit = (data: CustomerGroup) => {
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
                    <DialogTitle>{initialValues ? "Edit Customer Group" : "Create Customer Group"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Make changes to the customer's group." : "Fill in the details to create a new customer group."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Group Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
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

export default EditCustomerGroupDialog;
