package com.elemer.crm.service;

import com.elemer.crm.dto.VehicleDTO;
import com.elemer.crm.entity.Vehicle;
import com.elemer.crm.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Integer id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public Vehicle createVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = new Vehicle();
        vehicle.setBrand(vehicleDTO.getBrand());
        vehicle.setModel(vehicleDTO.getModel());
        vehicle.setInspectionDate(vehicleDTO.getInspectionDate());
        vehicle.setInsuranceDate(vehicleDTO.getInsuranceDate());
        vehicle.setTechnicalInspection(vehicleDTO.getTechnicalInspection());
        vehicle.setDriver(vehicleDTO.getDriver());
        vehicle.setOwner(vehicleDTO.getOwner());
        vehicle.setVin(vehicleDTO.getVin());
        vehicle.setEngine(vehicleDTO.getEngine());
        vehicle.setYear(vehicleDTO.getYear());

        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Integer id, VehicleDTO vehicleDTO) {
        Vehicle vehicle = getVehicleById(id);

        vehicle.setBrand(vehicleDTO.getBrand());
        vehicle.setModel(vehicleDTO.getModel());
        vehicle.setInspectionDate(vehicleDTO.getInspectionDate());
        vehicle.setInsuranceDate(vehicleDTO.getInsuranceDate());
        vehicle.setTechnicalInspection(vehicleDTO.getTechnicalInspection());
        vehicle.setDriver(vehicleDTO.getDriver());
        vehicle.setOwner(vehicleDTO.getOwner());
        vehicle.setVin(vehicleDTO.getVin());
        vehicle.setEngine(vehicleDTO.getEngine());
        vehicle.setYear(vehicleDTO.getYear());

        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Integer id) {
        vehicleRepository.deleteById(id);
    }

    public VehicleDTO getDecryptedVehicle(Integer id) {
        Vehicle vehicle = getVehicleById(id);

        VehicleDTO vehicleDTO = new VehicleDTO();
        vehicleDTO.setBrand(vehicle.getBrand());
        vehicleDTO.setModel(vehicle.getModel());
        vehicleDTO.setInspectionDate(vehicle.getInspectionDate());
        vehicleDTO.setInsuranceDate(vehicle.getInsuranceDate());
        vehicleDTO.setTechnicalInspection(vehicle.getTechnicalInspection());
        vehicleDTO.setDriver(vehicle.getDriver());
        vehicleDTO.setOwner(vehicle.getOwner());
        vehicleDTO.setVin(vehicle.getVin());
        vehicleDTO.setEngine(vehicle.getEngine());
        vehicleDTO.setYear(vehicle.getYear());

        return vehicleDTO;
    }
}
