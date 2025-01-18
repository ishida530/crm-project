import { useState } from 'react';
import DeleteProductAlertDialog from './DeleteProductAlertDialog';
import EditProductDialog from './EditProductDialog';
import { useCreateProduct } from './hooks/useCreateProduct';
import { useDeleteProduct } from './hooks/useDeleteProduct';
import { useUpdateProduct } from './hooks/useUpdateProduct';
import TableProducts from './TableProducts';
import { Product } from './types';
import useGetAllProducts from './hooks/useGetAllProducts';
import { Loader } from '@/components/ui/loader';


const ProductsPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productId, setProductId] = useState<number | null>(null);

    const { products, error, isLoading } = useGetAllProducts();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: createProduct } = useCreateProduct();

    const handleEditProduct = (product: Product) => {
        setIsEdit(true);
        setSelectedProduct(product);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedProduct: Product) => {
        if (isEdit && selectedProduct) {
            updateProduct({ ...updatedProduct, id: selectedProduct.id });
        } else {
            createProduct(updatedProduct);
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedProduct(null);
    };

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

    if (isLoading) {
        return <Loader isVisible />;
    }
     if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div>
            <TableProducts
                showWarehouseColumn={true}
                products={products} // Poprawione przekazywanie danych
                onAddProduct={handleCreateProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
            />
            {isOpenEditModal && (
                <EditProductDialog
                    initialValues={isEdit ? selectedProduct : undefined}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
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

export default ProductsPage;
