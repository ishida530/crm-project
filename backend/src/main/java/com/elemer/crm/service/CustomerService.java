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
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer createCustomer(CustomerDTO customerDTO) {
        if (!isValidEmail(customerDTO.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        Customer customer = new Customer();
        customer.setContactName(encryptData(customerDTO.getContactName()));

        String encryptedEmail = EncryptionUtil.encrypt(customerDTO.getEmail());
        String encryptedNip = EncryptionUtil.encrypt(customerDTO.getNip());

        customer.setEmail(encryptedEmail);
        customer.setNip(encryptedNip);

        String encryptedAddress = encryptData(customerDTO.getAddress());
        String encryptedWebsite = encryptData(customerDTO.getWebsite());

        customer.setAddress(encryptedAddress);
        customer.setWebsite(encryptedWebsite);

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
        customer.setContactName(encryptData(customerDTO.getContactName()));

        String encryptedEmail = EncryptionUtil.encrypt(customerDTO.getEmail());
        String encryptedNip = EncryptionUtil.encrypt(customerDTO.getNip());

        customer.setEmail(encryptedEmail);
        customer.setNip(encryptedNip);

        String encryptedAddress = encryptData(customerDTO.getAddress());
        String encryptedWebsite = encryptData(customerDTO.getWebsite());

        customer.setAddress(encryptedAddress);
        customer.setWebsite(encryptedWebsite);

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

        String decryptedEmail = EncryptionUtil.decrypt(customer.getEmail());
        String decryptedNip = EncryptionUtil.decrypt(customer.getNip());

        String decryptedContactName = decryptData(customer.getContactName());
        String decryptedAddress = decryptData(customer.getAddress());
        String decryptedWebsite = decryptData(customer.getWebsite());

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setContactName(decryptedContactName);
        customerDTO.setEmail(decryptedEmail);
        customerDTO.setNip(decryptedNip);
        customerDTO.setAddress(decryptedAddress);
        customerDTO.setWebsite(decryptedWebsite);
        customerDTO.setGroup(customer.getGroup().getId());

        return customerDTO;
    }

    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    private String encryptData(String data) {
        if (data != null) {
            return EncryptionUtil.encrypt(data);
        }
        return null;
    }

    private String decryptData(String data) {
        if (data != null) {
            return EncryptionUtil.decrypt(data);
        }
        return null;
    }
}
