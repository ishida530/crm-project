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

interface DeleteWarehouseDialogProps {
    onSave: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const DeleteWarehouseAlertDialog = ({ isOpen, onClose, onSave }: DeleteWarehouseDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={() => onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Czy na pewno chcesz usunąć magazyn?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tej operacji nie można cofnąć. Usunięcie magazynu spowoduje trwałe usunięcie
                        jego danych z systemu.
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

export default DeleteWarehouseAlertDialog;
