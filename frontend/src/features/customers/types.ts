import { CustomerGroup } from "../customerGroup/types";

export interface RegisterCustomer {
    contact_name: string;
    email: string;
    address: string;
    nip: string;
    website: string;
    group?: number;

}

export interface UpdateCustomerResponse {
    success: boolean;
    message: string;
    customer: Customer;
}

export interface Customer {
    id: number;
    contact_name: string;
    email: string;
    address: string;
    nip: string;
    website: string;
    group?: CustomerGroup | undefined
}

export interface CustomerListResponse {
    customer_list: Customer[];
    total_count: number;
}

export interface DeleteCustomerResponse {
    success: boolean;
    message: string;
}

