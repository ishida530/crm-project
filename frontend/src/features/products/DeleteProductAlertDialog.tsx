import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteProductAlertDialogProps {
    onSave: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const DeleteProductAlertDialog = ({ isOpen, onClose, onSave }: DeleteProductAlertDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={() => onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Czy na pewno chcesz usunąć ten produkt?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ta akcja jest nieodwracalna. Usunięcie produktu spowoduje trwałe usunięcie
                        wszystkich jego powiązanych danych.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Anuluj</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onSave()}>Kontynuuj</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteProductAlertDialog;
