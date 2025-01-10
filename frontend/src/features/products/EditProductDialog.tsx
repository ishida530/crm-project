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
import { Product } from '../warehouse/types';
import { productSchema } from './validate';
import { useParams } from 'react-router-dom';

interface EditProductDialogProps {
    initialValues?: Product | null;
    onSave: (updatedProduct: Product) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditProductDialog = ({ initialValues, onSave, isOpen, onClose }: EditProductDialogProps) => {

    const form = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: initialValues || {
            producer: '',
            name: '',
            quantity: 0,
            unit_of_measure: ''
        },
    });

    const onSubmit = (data: Product) => {
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
                    <DialogTitle>{initialValues ? "Edit Product" : "Create Product"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Make changes to the product." : "Fill in the details to create a new product."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="producer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Producer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Producer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Quantity"
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} // Convert string to number
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit_of_measure"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit of Measure</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Unit of Measure" {...field} />
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

export default EditProductDialog;
