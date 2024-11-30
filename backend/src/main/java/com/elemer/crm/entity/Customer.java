package com.elemer.crm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
@Table(name = "customers")
public class Customer {

    public class Views {
        public static class Public {}
        public static class Internal extends Public {}
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nazwa kontaktu nie może być pusta")
    private String contactName;

    @NotBlank(message = "Email nie może być pusty")
    private String email;

    @NotBlank(message = "Siedziba nie może być pusta")
    private String address;

    @NotBlank(message = "NIP nie może być pusty")
    private String nip;

    @NotBlank(message = "Strona www nie może być pusta")
    private String website;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonView(Views.Public.class)
    private CustomerGroup group;
}
