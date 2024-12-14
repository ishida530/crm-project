package com.elemer.crm.service;

import com.elemer.crm.entity.Warehouse;
import com.elemer.crm.repository.WarehouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Warehouse getWarehouseById(Integer id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public void deleteWarehouse(Integer id) {
        warehouseRepository.deleteById(id);
    }

    public Warehouse updateWarehouse(Integer id, Warehouse warehouse) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        existingWarehouse.setName(warehouse.getName());
        existingWarehouse.setAddress(warehouse.getAddress());

        return warehouseRepository.save(existingWarehouse);
    }
}
