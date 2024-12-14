
export interface RegisterWarehouse {
    name: string;
    address: string;
    products: Product[];
}

export interface CreateWarehouseResponse {
    id: number;
    name: string;
    address: string;
    products: Product[];
}

export interface Warehouse {
    id: number;
    name: string;
    address: string;
    products: Product[];
}

export interface Product {
    id: number;
    producer: string;
    name: string;
    quantity: number;
    unitOfMeasure: string;
    warehouse: Pick<Warehouse,"id">
}
export interface DeleteWarehouseResponse {
    id: number;
    message: string;
}

export interface UpdateWarehouseResponse {
    id: number;
    name: string;
    address: string;
    products: Product[];
}