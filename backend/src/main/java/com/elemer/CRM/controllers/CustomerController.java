package com.elemer.CRM.controllers;


import com.elemer.CRM.model.Customer;
import com.elemer.CRM.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")

public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @GetMapping()
    public List<Customer> getAll(){
        return customerRepository.getAll();
    }


    @GetMapping("/{id}")
    public Customer getAll(@PathVariable("id") int id){
        return customerRepository.getById(id);
    }

    @PostMapping()
    public ResponseEntity<String> save(@RequestBody Customer customer){
        return customerRepository.save(customer);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        Customer customer = customerRepository.getById(id);
        if (customer != null) {
            updatedCustomer.setId(id);
            return customerRepository.update(updatedCustomer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
        }
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<String> delete(@PathVariable("id") int id){
        return customerRepository.delete(id);
    }

}
