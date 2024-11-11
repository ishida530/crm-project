package com.elemer.crm.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerDTO {

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
