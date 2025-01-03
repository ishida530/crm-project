export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    inspection_date?: string; // Opcjonalne
    insurance_date?: string; // Opcjonalne
    technical_inspection?: number; // Opcjonalne
    driver?: string; // Opcjonalne
    owner?: string; // Opcjonalne
    vin: string;
    engine: string;
    year: number;
}

export interface VehicleListResponse {
    vehicleList: Vehicle[];
}

export interface UpdateVehicleResponse {
    vehicle: Vehicle;
}

export interface DeleteVehicleResponse {
    message: string;
}
