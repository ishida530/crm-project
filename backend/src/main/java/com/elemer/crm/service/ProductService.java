package com.elemer.crm.service;

import com.elemer.crm.entity.Product;
import com.elemer.crm.entity.Warehouse;
import com.elemer.crm.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final WarehouseService warehouseService;

    public ProductService(ProductRepository productRepository, WarehouseService warehouseService) {
        this.productRepository = productRepository;
        this.warehouseService = warehouseService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product saveProduct(Product product) {
        // Obsługuje sytuację, gdy warehouse jest null
        if (product.getWarehouse() != null) {
            Integer warehouseId = product.getWarehouse().getId();
            Warehouse warehouse = warehouseService.getWarehouseById(warehouseId);
            product.setWarehouse(warehouse);
        } else {
            throw new IllegalArgumentException("Warehouse cannot be null");
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Integer id, Product product) {
        Product existingProduct = getProductById(id);

        existingProduct.setProducer(product.getProducer());
        existingProduct.setName(product.getName());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setUnitOfMeasure(product.getUnitOfMeasure());

        // Obsługuje sytuację, gdy warehouse jest null
        if (product.getWarehouse() != null) {
            Warehouse warehouse = warehouseService.getWarehouseById(product.getWarehouse().getId());
            existingProduct.setWarehouse(warehouse);
        } else {
            throw new IllegalArgumentException("Warehouse cannot be null");
        }

        return productRepository.save(existingProduct);
    }
}
