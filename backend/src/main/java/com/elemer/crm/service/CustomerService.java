package com.elemer.crm.service;

import com.elemer.crm.dto.CustomerDTO;
import com.elemer.crm.entity.Customer;
import com.elemer.crm.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer createCustomer(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setContactName(customerDTO.getContactName());
        customer.setEmail(customerDTO.getEmail());
        customer.setAddress(customerDTO.getAddress());
        customer.setNip(customerDTO.getNip());
        customer.setWebsite(customerDTO.getWebsite());
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, CustomerDTO customerDTO) {
        Customer customer = getCustomerById(id);
        customer.setContactName(customerDTO.getContactName());
        customer.setEmail(customerDTO.getEmail());
        customer.setAddress(customerDTO.getAddress());
        customer.setNip(customerDTO.getNip());
        customer.setWebsite(customerDTO.getWebsite());
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}