package com.elemer.crm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nazwa kontaktu nie może być pusta")
    private String contactName;

    @Email(message = "Nieprawidłowy format maila")
    @NotBlank(message = "Email nie może być pusty")
    private String email;

    @NotBlank(message = "Siedziba nie może być pusta")
    private String address;

    @NotBlank(message = "NIP nie może być pusty")
    private String nip;

    @NotBlank(message = "Strona www nie może być pusta")
    private String website;

}
