export interface RegisterCustomer {
    contactName: string;
    email: string;
    address: string;
    nip: string;
    website: string;
}

export interface UpdateCustomerResponse {
    success: boolean;
    message: string;
    customer: Customer;
}

export interface Customer {
    id: number;
    contactName: string;
    email: string;
    address: string;
    nip: string;
    website: string;
}

export interface CustomerListResponse {
    customerList: Customer[];
    totalCount: number;
}

export interface DeleteCustomerResponse {
    success: boolean;
    message: string;
}
