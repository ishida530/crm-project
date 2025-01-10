import { Product } from "../warehouse/types";

export interface DeleteProductResponse {
    success: boolean;
    message: string;
    deletedProductId?: number;
}
export interface UpdateProductResponse {
    success: boolean;
    message: string;
    updatedProduct: Product;
}
