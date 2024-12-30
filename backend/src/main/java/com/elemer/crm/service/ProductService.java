package com.elemer.crm.service;

import com.elemer.crm.entity.Product;
import com.elemer.crm.entity.Warehouse;
import com.elemer.crm.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final WarehouseService warehouseService;

    public ProductService(ProductRepository productRepository, WarehouseService warehouseService) {
        this.productRepository = productRepository;
        this.warehouseService = warehouseService;
    }
    public List<Map<String, Object>> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> {
                    Map<String, Object> productData = new HashMap<>();
                    productData.put("id", product.getId());
                    productData.put("producer", product.getProducer());
                    productData.put("name", product.getName());
                    productData.put("quantity", product.getQuantity());
                    productData.put("unitOfMeasure", product.getUnitOfMeasure());
                    productData.put("warehouseId", product.getWarehouse() != null ? product.getWarehouse().getId() : null);
                    productData.put("warehouseName", product.getWarehouse() != null ? product.getWarehouse().getName() : null);

                    return productData;
                })
                .collect(Collectors.toList());
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product saveProduct(Product product) {
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

        if (product.getWarehouse() != null) {
            Warehouse warehouse = warehouseService.getWarehouseById(product.getWarehouse().getId());
            existingProduct.setWarehouse(warehouse);
        } else {
            throw new IllegalArgumentException("Warehouse cannot be null");
        }

        return productRepository.save(existingProduct);
    }
}
