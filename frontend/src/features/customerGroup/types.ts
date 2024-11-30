import { Customer } from "../customers/types";

export type CustomerGroup = {
    id?: number,
    name: string
    customers: Customer[]

}
export type UpdateCustomerGroupResponse = {
    id: number;
    name: string;
    updatedAt: string;
};

export type RegisterCustomerGroup = {
    name: string
}