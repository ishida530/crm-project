import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Investment } from "./types";
import { InvestmentFormSchema } from "./validate";
import { Checkbox } from "@/components/ui/checkbox";

interface InvestmentFormProps {
    initialValues?: Investment;
    onSave: (data: Investment) => void;
    isOpen: boolean;
    onClose: () => void;
}

const InvestmentFormModal = ({
    initialValues,
    onSave,
    isOpen,
    onClose,
}: InvestmentFormProps) => {
    const { id, ...otherValues } = initialValues || {};

    const form = useForm<Investment>({
        resolver: zodResolver(InvestmentFormSchema),
        defaultValues: initialValues
            ? otherValues
            : {
                name: "",
                contract_signing_date: "",
                completion_deadline: "",
                contract_annex: "",
                notes: "",
                construction_site_contact: "",
                responsible_person: "",
                supervision_inspector: "",
                journal_registration: "", // Initially empty, will store Boolean or date
                work_start_notification: "", // Initially empty, will store Boolean or date
                construction_board: "",
                building_project_minor_changes: "",
                execution_project: "",
                string_design: "",
                medium_voltage_connection_scope: "",
                acceptance_protocol: "",
                osd_acceptance_documentation: "",
                client_acceptance_documentation: "",
                power_plant_connection: "",
                psp_notification: "",
                pinb_notification: "",
                surveyor_stakeout: "",
                surveyor_inventory: "",
                fence_delivery: "",
                fence_construction: "",
                site_security: "",
                structure_delivery: "",
                piling: "",
                structure_assembly: "",
                module_delivery: "",
                module_installation: "",
                assembly_materials: "",
                ac_wiring_routes: "",
                dc_wiring_routes: "",
                medium_voltage_wiring_routes: "",
                transformer_station: "",
                telematics: "",
                cctv: "",
                equipotential_connections: "",
            },
    });

    const onSubmit = (data: Investment) => {
        console.log("Formularz przesłany z danymi:", data);
        onSave(data);
        onClose();
    };

    const fieldLabels: Record<string, string> = {
        name: "Nazwa projektu",
        contract_signing_date: "Data podpisania umowy",
        completion_deadline: "Termin zakończenia",
        contract_annex: "Załącznik umowy",
        notes: "Uwagi",
        construction_site_contact: "Kontakt na budowie",
        responsible_person: "Osoba odpowiedzialna",
        supervision_inspector: "Nadzór budowlany",
        journal_registration: "Rejestracja w dzienniku budowy",
        work_start_notification: "Powiadomienie o rozpoczęciu pracy",
        construction_board: "Tablica budowy",
        building_project_minor_changes: "Zmiany w projekcie budowlanym",
        execution_project: "Projekt wykonawczy",
        string_design: "Projekt stringów",
        medium_voltage_connection_scope: "Zakres przyłącza średniego napięcia",
        acceptance_protocol: "Protokół odbioru",
        osd_acceptance_documentation: "Dokumentacja odbioru OSD",
        client_acceptance_documentation: "Dokumentacja odbioru klienta",
        power_plant_connection: "Przyłączenie elektrowni",
        psp_notification: "Powiadomienie PSP",
        pinb_notification: "Powiadomienie PINB",
        surveyor_stakeout: "Wyznaczenie geodezyjne",
        surveyor_inventory: "Inwentaryzacja geodezyjna",
        fence_delivery: "Dostawa ogrodzenia",
        fence_construction: "Budowa ogrodzenia",
        site_security: "Zabezpieczenie placu budowy",
        structure_delivery: "Dostawa konstrukcji",
        piling: "Palowanie",
        structure_assembly: "Montaż konstrukcji",
        module_delivery: "Dostawa modułów",
        module_installation: "Montaż modułów",
        assembly_materials: "Materiały montażowe",
        ac_wiring_routes: "Trasy okablowania AC",
        dc_wiring_routes: "Trasy okablowania DC",
        medium_voltage_wiring_routes: "Trasy okablowania SN",
        transformer_station: "Stacja transformatorowa",
        telematics: "Telemetria",
        cctv: "Monitoring CCTV",
        equipotential_connections: "Połączenia ekwipotencjalne",
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialValues ? "Edytuj Inwestycję" : "Utwórz Inwestycję"}
                    </DialogTitle>
                    <DialogDescription>
                        {initialValues
                            ? "Wprowadź zmiany w inwestycji."
                            : "Wypełnij dane, aby utworzyć nową inwestycję."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {Object.keys(form.getValues()).map((key) => {
                            const isCheckboxField = [
                                "journal_registration",
                                "work_start_notification",
                                "construction_board",
                                "power_plant_connection",
                                "psp_notification",
                                "pinb_notification",
                            ].includes(key);

                            return (
                                <FormField
                                    key={key}
                                    control={form.control}
                                    name={key}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{fieldLabels[key] || key}</FormLabel>
                                            <FormControl>
                                                {key === "contract_signing_date" ||
                                                key === "completion_deadline" ? (
                                                    <Input
                                                        type="date"
                                                        value={field.value || ""}
                                                        onChange={(e) => field.onChange(e.target.value)}
                                                        placeholder={fieldLabels[key]}
                                                    />
                                                ) : isCheckboxField ? (
                                                    <>
                                                        <Checkbox
                                                            checked={!!field.value}
                                                            onCheckedChange={(checked) =>
                                                                field.onChange(checked ? "1" : "")
                                                            }
                                                        />
                                                        {field.value && (
                                                            <Input
                                                                type="text"
                                                                value={field.value}
                                                                onChange={(e) =>
                                                                    field.onChange(e.target.value)
                                                                }
                                                                placeholder="Wprowadź wartość"
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <Input
                                                        placeholder={fieldLabels[key]}
                                                        {...field}
                                                    />
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            );
                        })}
                        <DialogFooter>
                            <Button type="submit" className="w-full">
                                {initialValues ? "Zapisz zmiany" : "Utwórz Inwestycję"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default InvestmentFormModal;
