package com.elemer.crm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class WebPushSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String notificationEndPoint;
    private String public_key;
    private String auth;
    @Column(unique = true) // Dodanie ograniczenia unikalności na user_id
    private Integer user_id;}
