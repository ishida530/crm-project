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
import { Vehicle } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formSchema } from './validate';

interface EditVehicleDialogProps {
    initialValues?: Vehicle;
    onSave: (updatedVehicle: Vehicle) => void;
    isOpen: boolean;
    onClose: () => void;
}

const EditVehicleDialog = ({ initialValues, onSave, isOpen, onClose }: EditVehicleDialogProps) => {
    console.log(initialValues)
    const form = useForm<Vehicle>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            brand: '',
            model: '',
            vin: '',
            engine: '',
            year: new Date().getFullYear(),
            inspection_date: '',
            insurance_date: '',
            technical_inspection: undefined,
            driver: '',
            owner: '',
        },
    });

    const onSubmit = (data: Vehicle) => {
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
                    <DialogTitle>{initialValues ? "Edytuj pojazd" : "Dodaj pojazd"}</DialogTitle>
                    <DialogDescription>
                        {initialValues ? "Dokonaj zmian w danych pojazdu." : "Wypełnij dane, aby dodać nowy pojazd."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Marka */}
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marka</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Marka" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Model */}
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Model" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* VIN */}
                        <FormField
                            control={form.control}
                            name="vin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VIN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="VIN" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Silnik */}
                        <FormField
                            control={form.control}
                            name="engine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Silnik</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Silnik" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rok */}
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rok</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Rok" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Przegląd techniczny */}
                        <FormField
                            control={form.control}
                            name="technical_inspection"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Przegląd techniczny</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value?.toString() || "0"}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Wybierz status przeglądu" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Aktualny</SelectItem>
                                                <SelectItem value="0">Brak</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Data przeglądu */}
                        <FormField
                            control={form.control}
                            name="inspection_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data przeglądu</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Data przeglądu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Data ubezpieczenia */}
                        <FormField
                            control={form.control}
                            name="insurance_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data ubezpieczenia</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Data ubezpieczenia" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Kierowca */}
                        <FormField
                            control={form.control}
                            name="driver"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kierowca</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kierowca" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Właściciel */}
                        <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Właściciel</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Właściciel" {...field} />
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

export default EditVehicleDialog;
