package com.elemer.crm.service;

import com.elemer.crm.dto.CustomerDTO;
import com.elemer.crm.entity.Customer;
import com.elemer.crm.entity.CustomerGroup;
import com.elemer.crm.repository.CustomerRepository;
import com.elemer.crm.repository.CustomerGroupRepository;
import com.elemer.crm.util.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerGroupRepository customerGroupRepository;

    public List<Customer> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        customers.forEach(this::decryptCustomerData);
        return customers;
    }

    public Customer getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        decryptCustomerData(customer);
        return customer;
    }

    public Customer createCustomer(CustomerDTO customerDTO) {
        if (!isValidEmail(customerDTO.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        Customer customer = new Customer();
        customer.setContactName(EncryptionUtil.encrypt(customerDTO.getContactName()));
        customer.setEmail(EncryptionUtil.encrypt(customerDTO.getEmail()));
        customer.setNip(EncryptionUtil.encrypt(customerDTO.getNip()));
        customer.setAddress(EncryptionUtil.encrypt(customerDTO.getAddress()));
        customer.setWebsite(EncryptionUtil.encrypt(customerDTO.getWebsite()));

        CustomerGroup group = customerGroupRepository.findById(customerDTO.getGroup())
                .orElseThrow(() -> new RuntimeException("Group not found"));
        customer.setGroup(group);

        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, CustomerDTO customerDTO) {
        if (!isValidEmail(customerDTO.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        Customer customer = getCustomerById(id);
        customer.setContactName(EncryptionUtil.encrypt(customerDTO.getContactName()));
        customer.setEmail(EncryptionUtil.encrypt(customerDTO.getEmail()));
        customer.setNip(EncryptionUtil.encrypt(customerDTO.getNip()));
        customer.setAddress(EncryptionUtil.encrypt(customerDTO.getAddress()));
        customer.setWebsite(EncryptionUtil.encrypt(customerDTO.getWebsite()));

        CustomerGroup group = customerGroupRepository.findById(customerDTO.getGroup())
                .orElseThrow(() -> new RuntimeException("Group not found"));
        customer.setGroup(group);

        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public CustomerDTO getDecryptedCustomer(Long id) {
        Customer customer = getCustomerById(id);

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setContactName(EncryptionUtil.decrypt(customer.getContactName()));
        customerDTO.setEmail(EncryptionUtil.decrypt(customer.getEmail()));
        customerDTO.setNip(EncryptionUtil.decrypt(customer.getNip()));
        customerDTO.setAddress(EncryptionUtil.decrypt(customer.getAddress()));
        customerDTO.setWebsite(EncryptionUtil.decrypt(customer.getWebsite()));
        customerDTO.setGroup(customer.getGroup().getId());

        return customerDTO;
    }

    private void decryptCustomerData(Customer customer) {
        customer.setContactName(EncryptionUtil.decrypt(customer.getContactName()));
        customer.setEmail(EncryptionUtil.decrypt(customer.getEmail()));
        customer.setNip(EncryptionUtil.decrypt(customer.getNip()));
        customer.setAddress(EncryptionUtil.decrypt(customer.getAddress()));
        customer.setWebsite(EncryptionUtil.decrypt(customer.getWebsite()));
    }

    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
