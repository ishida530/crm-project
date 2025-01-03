package com.elemer.crm.controller;

import com.elemer.crm.dto.VehicleDTO;
import com.elemer.crm.entity.Vehicle;
import com.elemer.crm.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Integer id) {
        Vehicle vehicle = vehicleService.getVehicleById(id);
        return new ResponseEntity<>(vehicle, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@Valid @RequestBody VehicleDTO vehicleDTO) {
        System.out.println("controller: " + vehicleDTO);
        Vehicle createdVehicle = vehicleService.createVehicle(vehicleDTO);
        return new ResponseEntity<>(createdVehicle, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable Integer id,
            @Valid @RequestBody VehicleDTO vehicleDTO) {
        Vehicle updatedVehicle = vehicleService.updateVehicle(id, vehicleDTO);
        return new ResponseEntity<>(updatedVehicle, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Integer id) {
        vehicleService.deleteVehicle(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
