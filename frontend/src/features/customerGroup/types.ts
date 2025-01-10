import { Customer } from "../customers/types";

export type CustomerGroup = {
    id?: number,
    name: string
    customers: Customer[]

}
export type UpdateCustomerGroupResponse = {
    id: number;
    name: string;
    updated_at: string;
};

export type RegisterCustomerGroup = {
    name: string
}