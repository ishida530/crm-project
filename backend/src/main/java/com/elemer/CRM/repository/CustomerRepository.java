package com.elemer.CRM.repository;

import com.elemer.CRM.model.Customer;
import com.elemer.CRM.util.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Customer> getAll() {
        List<Customer> customers = jdbcTemplate.query("SELECT * FROM customers",
                BeanPropertyRowMapper.newInstance(Customer.class));

        for (Customer customer : customers) {
            decryptSensitiveData(customer);
        }

        return customers;
    }

    public Customer getById(int id) {
        Customer customer = jdbcTemplate.queryForObject("SELECT * FROM customers WHERE id=?",
                BeanPropertyRowMapper.newInstance(Customer.class), id);
        decryptSensitiveData(customer);
        return customer;
    }

    public ResponseEntity<String> save(Customer customer) {
        try {
            String sql = "INSERT INTO customers(company_name, contact_person, phone_number, email, nip, regon, krs) VALUES (?, ?, ?, ?, ?, ?, ?)";

            String encryptedPhoneNumber = EncryptionUtil.encrypt(customer.getPhoneNumber());
            String encryptedEmail = EncryptionUtil.encrypt(customer.getEmail());
            String encryptedNip = EncryptionUtil.encrypt(customer.getNip());
            String encryptedRegon = EncryptionUtil.encrypt(customer.getRegon());
            String encryptedKrs = EncryptionUtil.encrypt(customer.getKrs());

            int rowsAffected = jdbcTemplate.update(sql,
                    customer.getCompanyName(),
                    customer.getContactPerson(),
                    encryptedPhoneNumber,
                    encryptedEmail,
                    encryptedNip,
                    encryptedRegon,
                    encryptedKrs);

            if (rowsAffected > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("Customer saved successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save customer.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Encryption error: " + e.getMessage());
        }
    }

    public ResponseEntity<String> update(Customer customer) {
        try {
            String sql = "UPDATE customers SET company_name = ?, contact_person = ?, phone_number = ?, email = ?, nip = ?, regon = ?, krs = ? WHERE id = ?";

            // Szyfrowanie wrażliwych danych
            String encryptedPhoneNumber = EncryptionUtil.encrypt(customer.getPhoneNumber());
            String encryptedEmail = EncryptionUtil.encrypt(customer.getEmail());
            String encryptedNip = EncryptionUtil.encrypt(customer.getNip());
            String encryptedRegon = EncryptionUtil.encrypt(customer.getRegon());
            String encryptedKrs = EncryptionUtil.encrypt(customer.getKrs());

            int rowsAffected = jdbcTemplate.update(sql,
                    customer.getCompanyName(),
                    customer.getContactPerson(),
                    encryptedPhoneNumber,
                    encryptedEmail,
                    encryptedNip,
                    encryptedRegon,
                    encryptedKrs,
                    customer.getId());

            if (rowsAffected > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("Customer updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Encryption error: " + e.getMessage());
        }
    }

public ResponseEntity<String> delete(int id){
        try{
            String sql = "DELETE FROM customers WHERE id=?";
            int rowsAffected = jdbcTemplate.update(sql, id);

            if (rowsAffected > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("Customer deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
            }
        } catch (Exception e) {
            System.err.println("Deletion error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete customer.");
        }
}

    private void decryptSensitiveData(Customer customer) {
        try {
            customer.setPhoneNumber(EncryptionUtil.decrypt(customer.getPhoneNumber()));
            customer.setEmail(EncryptionUtil.decrypt(customer.getEmail()));
            customer.setNip(EncryptionUtil.decrypt(customer.getNip()));
            customer.setRegon(EncryptionUtil.decrypt(customer.getRegon()));
            customer.setKrs(EncryptionUtil.decrypt(customer.getKrs()));
        } catch (Exception e) {
            System.err.println("Decryption error: " + e.getMessage());
        }
    }
}
