package com.elemer.crm.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class InvestmentDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("contract_signing_date")
    private Date contractSigningDate;

    @JsonProperty("completion_deadline")
    private Date completionDeadline;

    @JsonProperty("contract_annex")
    private String contractAnnex;

    @JsonProperty("notes")
    private String notes;

    @JsonProperty("construction_site_contact")
    private String constructionSiteContact;

    @JsonProperty("responsible_person")
    private String responsiblePerson;

    @JsonProperty("supervision_inspector")
    private String supervisionInspector;

    @JsonProperty("journal_registration")
    private Integer journalRegistration;

    @JsonProperty("work_start_notification")
    private Integer workStartNotification;

    @JsonProperty("construction_board")
    private Integer constructionBoard;

    @JsonProperty("building_project_minor_changes")
    private String buildingProjectMinorChanges;

    @JsonProperty("execution_project")
    private String executionProject;

    @JsonProperty("string_design")
    private String stringDesign;

    @JsonProperty("medium_voltage_connection_scope")
    private String mediumVoltageConnectionScope;

    @JsonProperty("acceptance_protocol")
    private String acceptanceProtocol;

    @JsonProperty("osd_acceptance_documentation")
    private String OSDAcceptanceDocumentation;

    @JsonProperty("client_acceptance_documentation")
    private String clientAcceptanceDocumentation;

    @JsonProperty("power_plant_connection")
    private Integer powerPlantConnection;

    @JsonProperty("psp_notification")
    private Integer PSPNotification;  // Integer (1 or 0)

    @JsonProperty("pinb_notification")
    private Integer PINBNotification; // Integer (1 or 0)

    @JsonProperty("surveyor_stakeout")
    private String surveyorStakeout;

    @JsonProperty("surveyor_inventory")
    private String surveyorInventory;

    @JsonProperty("fence_delivery")
    private String fenceDelivery;

    @JsonProperty("fence_construction")
    private String fenceConstruction;

    @JsonProperty("site_security")
    private String siteSecurity;

    @JsonProperty("structure_delivery")
    private String structureDelivery;

    @JsonProperty("piling")
    private String piling;

    @JsonProperty("structure_assembly")
    private String structureAssembly;

    @JsonProperty("module_delivery")
    private String moduleDelivery;

    @JsonProperty("module_installation")
    private String moduleInstallation;

    @JsonProperty("assembly_materials")
    private String assemblyMaterials;

    @JsonProperty("ac_wiring_routes")
    private String ACWiringRoutes;

    @JsonProperty("dc_wiring_routes")
    private String DCWiringRoutes;

    @JsonProperty("medium_voltage_wiring_routes")
    private String mediumVoltageWiringRoutes;

    @JsonProperty("transformer_station")
    private String transformerStation;

    @JsonProperty("telematics")
    private String telemechanics;

    @JsonProperty("cctv")
    private String CCTV;

    @JsonProperty("equipotential_connections")
    private String equipotentialConnections;
}
