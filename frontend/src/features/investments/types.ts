export interface InvestmentsResponse {
    statusCode: number;
    message: string;
    investments: Investment[];
}

export interface Investment {
    id?: number;
    name?: string;
    contract_signing_date?: string;
    completion_deadline?: string;
    contract_annex?: string;
    notes?: string;
    construction_site_contact?: string;
    responsible_person?: string;
    supervision_inspector?: string;
    journal_registration?: Date;
    work_start_notification?: Date;
    construction_board?: string;
    building_project_minor_changes?: string;
    execution_project?: string;
    string_design?: string;
    medium_voltage_connection_scope?: string;
    acceptance_protocol?: string;
    osd_acceptance_documentation?: string;
    client_acceptance_documentation?: string;
    power_plant_connection?: string;
    psp_notification?: string;
    pinb_notification?: string;
    surveyor_stakeout?: string;
    surveyor_inventory?: string;
    fence_delivery?: string;
    fence_construction?: string;
    site_security?: string;
    structure_delivery?: string;
    piling?: string;
    structure_assembly?: string;
    module_delivery?: string;
    module_installation?: string;
    assembly_materials?: string;
    ac_wiring_routes?: string;
    dc_wiring_routes?: string;
    medium_voltage_wiring_routes?: string;
    transformer_station?: string;
    telematics?: string;
    cctv?: string;
    equipotential_connections?: string;

    // Index signature allowing any string as a key
    [key: string]: string | number | Date | undefined;  // Here you can define all the possible types
}
