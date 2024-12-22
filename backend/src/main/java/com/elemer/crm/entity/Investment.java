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

    private String name;
    private Date contractSigningDate;
    private Date completionDeadline;
    private String contractAnnex;
    private String notes;
    private String constructionSiteContact;
    private String responsiblePerson;
    private String supervisionInspector;
    private Boolean journalRegistration;
    private Boolean workStartNotification;
    private Boolean constructionBoard;
    private String buildingProjectMinorChanges;
    private String executionProject;
    private String stringDesign;
    private String mediumVoltageConnectionScope;
    private String acceptanceProtocol;
    private String OSDAcceptanceDocumentation;
    private String clientAcceptanceDocumentation;
    private Boolean powerPlantConnection;
    private Boolean PSPNotification;
    private Boolean PINBNotification;
    private String surveyorStakeout;
    private String surveyorInventory;
    private String fenceDelivery;
    private String fenceConstruction;
    private String siteSecurity;
    private String structureDelivery;
    private String piling;
    private String structureAssembly;
    private String moduleDelivery;
    private String moduleInstallation;
    private String assemblyMaterials;
    private String ACWiringRoutes;
    private String DCWiringRoutes;
    private String mediumVoltageWiringRoutes;
    private String transformerStation;
    private String telemechanics;
    private String CCTV;
    private String equipotentialConnections;
}
