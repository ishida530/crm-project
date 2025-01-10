
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
    unit_of_measure: string;
    warehouse?: Pick<Warehouse, "id">;
    warehouseName?: string;
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