package com.elemer.CRM.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Customer {
    private int id;
    private String companyName;
    private String contactPerson;
    private String phoneNumber;
    private String email;
    private String nip;
    private String regon;
    private String krs;

}
