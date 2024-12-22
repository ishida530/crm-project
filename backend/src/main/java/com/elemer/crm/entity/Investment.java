package com.elemer.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "investments")
@Data
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "contract_signing_date")
    private Date contractSigningDate;

    @Column(name = "completion_deadline")
    private Date completionDeadline;

    @Column(name = "contract_annex")
    private String contractAnnex;

    @Column(name = "notes")
    private String notes;

    @Column(name = "construction_site_contact")
    private String constructionSiteContact;

    @Column(name = "responsible_person")
    private String responsiblePerson;

    @Column(name = "supervision_inspector")
    private String supervisionInspector;

    @Column(name = "journal_registration")
    private Integer journalRegistration;

    @Column(name = "work_start_notification")
    private Integer workStartNotification;

    @Column(name = "construction_board")
    private Integer constructionBoard;

    @Column(name = "building_project_minor_changes")
    private String buildingProjectMinorChanges;

    @Column(name = "execution_project")
    private String executionProject;

    @Column(name = "string_design")
    private String stringDesign;

    @Column(name = "medium_voltage_connection_scope")
    private String mediumVoltageConnectionScope;

    @Column(name = "acceptance_protocol")
    private String acceptanceProtocol;

    @Column(name = "osd_acceptance_documentation")
    private String OSDAcceptanceDocumentation;

    @Column(name = "client_acceptance_documentation")
    private String clientAcceptanceDocumentation;

    @Column(name = "power_plant_connection")
    private Integer powerPlantConnection;

    @Column(name = "psp_notification")
    private Integer PSPNotification;  // Integer (1 or 0)

    @Column(name = "pinb_notification")
    private Integer PINBNotification; // Integer (1 or 0)

    @Column(name = "surveyor_stakeout")
    private String surveyorStakeout;

    @Column(name = "surveyor_inventory")
    private String surveyorInventory;

    @Column(name = "fence_delivery")
    private String fenceDelivery;

    @Column(name = "fence_construction")
    private String fenceConstruction;

    @Column(name = "site_security")
    private String siteSecurity;

    @Column(name = "structure_delivery")
    private String structureDelivery;

    @Column(name = "piling")
    private String piling;

    @Column(name = "structure_assembly")
    private String structureAssembly;

    @Column(name = "module_delivery")
    private String moduleDelivery;

    @Column(name = "module_installation")
    private String moduleInstallation;

    @Column(name = "assembly_materials")
    private String assemblyMaterials;

    @Column(name = "ac_wiring_routes")
    private String ACWiringRoutes;

    @Column(name = "dc_wiring_routes")
    private String DCWiringRoutes;

    @Column(name = "medium_voltage_wiring_routes")
    private String mediumVoltageWiringRoutes;

    @Column(name = "transformer_station")
    private String transformerStation;

    @Column(name = "telematics")
    private String telemechanics;

    @Column(name = "cctv")
    private String CCTV;

    @Column(name = "equipotential_connections")
    private String equipotentialConnections;
}
