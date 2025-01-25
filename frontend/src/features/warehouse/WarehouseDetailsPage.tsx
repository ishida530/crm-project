import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetWarehouseDetails from './hooks/useGetWarehouseDetails';
import { Product } from './types';

import TableProducts from '../products/TableProducts';
import EditProductDialog from '../products/EditProductDialog';
import DeleteProductAlertDialog from '../products/DeleteProductAlertDialog';
import { useCreateProduct } from '../products/hooks/useCreateProduct';
import { useDeleteProduct } from '../products/hooks/useDeleteProduct';
import { useUpdateProduct } from '../products/hooks/useUpdateProduct';

const WarehouseDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: warehouse, error, isLoading } = useGetWarehouseDetails(Number(id)); // Fetch warehouse details

    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);

    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: createProduct } = useCreateProduct();

    if (isLoading) return <div>Loading warehouse details...</div>;
    if (error) return <div>Error loading warehouse details: {error.message}</div>;

    const handleEditProduct = (product: Product) => {
        setIsEdit(true);
        setSelectedProduct(product);
        setIsOpenEditModal(true);
    };

    const handleUpdateProduct = (updatedProduct: Product) => {
        if (isEdit && selectedProduct) {
            updateProduct({
                ...updatedProduct, id: selectedProduct.id, warehouse: {
                    id: Number(id)
                }
            });
        } else {
            createProduct({
                ...updatedProduct, warehouse: {
                    id: Number(id)
                }
            });
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedProduct(null);
    };

    // Handle product deletion
    const handleDeleteProduct = (productId: number) => {
        setProductId(productId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (productId) {
            deleteProduct(productId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateProduct = () => {
        setIsEdit(false);
        setSelectedProduct(null);
        setIsOpenEditModal(true);
    };

    return (
        <div>
            <h1>Szczegóły magazynu</h1>
            {warehouse ? (
                <div>
                    <h2>{warehouse.name}</h2>
                    <p><strong>Lokalizacja:</strong> {warehouse.address}</p>


                    <h3>Produkty w magazynie</h3>

                    <TableProducts
                        products={warehouse.products}
                        onEditProduct={handleEditProduct}
                        onDeleteProduct={handleDeleteProduct}
                        onAddProduct={handleCreateProduct}
                    />
                </div>
            ) : (
                <div>No warehouse details found.</div>
            )}

            {/* Edit Product Modal */}
            {isOpenEditModal && (
                <EditProductDialog
                    initialValues={isEdit ? selectedProduct : undefined}
                    onSave={handleUpdateProduct}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}

            {/* Delete Product Modal */}
            {isOpenDeleteModal && productId && (
                <DeleteProductAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default WarehouseDetailsPage;
