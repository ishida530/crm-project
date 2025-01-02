import { useState } from "react";
import DeleteInvestmentAlertDialog from "./DeleteInvestmentAlertDialog";
import useGetInvestments from "./hooks/useGetInvestments";
import { useEditInvestment } from "./hooks/useEditInvestment";
import InvestmentTable from "./InvestmentTable";
import InvestmentFormModal from "./InvestmentFormModal";
import { useDeleteInvestment } from "./hooks/useDeleteInvestment";
import { useCreateInvestment } from "./hooks/useCreateInvestment";
import { Investment } from "./types";

const InvestmentsPage = () => {
    const { investments, error, isLoading } = useGetInvestments();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [investmentToEdit, setInvestmentToEdit] = useState<Investment | null>(null);
    const [investmentId, setInvestmentId] = useState<number>();
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { mutate: createInvestment } = useCreateInvestment();
    const { mutate: deleteInvestment } = useDeleteInvestment();
    const { mutate: editInvestment } = useEditInvestment();

    const handleAddInvestment = () => {
        setIsFormOpen(true);
        setInvestmentToEdit(null);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmit = (investmentData: Investment) => {
        if (investmentToEdit) {
            console.log("Updated investment", investmentData);
            editInvestment({ id: investmentToEdit.id, ...investmentData });
        } else {
            createInvestment(investmentData);
        }
        setInvestmentToEdit(null);
        handleCloseForm();
    };

    const handleEditInvestment = (investment: Investment) => {
        console.log("Editing investment", investment);
        setInvestmentToEdit({ ...investment });
        setIsFormOpen(true);
    };

    const handleDelete = () => {
        if (investmentId) deleteInvestment(investmentId);
        setIsOpenDeleteModal(false);
    };

    const handleDeleteInvestment = (investmentId: number) => {
        setInvestmentId(investmentId);
        setIsOpenDeleteModal(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="">
            <h1 className="text-xl font-bold mb-4">Investments</h1>
            {investments && (
                <InvestmentTable
                    data={investments}
                    onAddInvestment={handleAddInvestment}
                    onEditInvestment={handleEditInvestment}
                    onDeleteInvestment={handleDeleteInvestment}
                />
            )}
            {isFormOpen && (
                <InvestmentFormModal
                    onClose={handleCloseForm}
                    onSave={handleSubmit}
                    isOpen={isFormOpen}
                    initialValues={investmentToEdit ? investmentToEdit : undefined}
                />
            )}
            {isOpenDeleteModal && (
                <DeleteInvestmentAlertDialog
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                    onSave={handleDelete}
                />
            )}
        </div>
    );
};

export default InvestmentsPage;
