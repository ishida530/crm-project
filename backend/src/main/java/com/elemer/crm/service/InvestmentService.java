package com.elemer.crm.service;

import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.dto.InvestmentDTO;
import com.elemer.crm.entity.Investment;
import com.elemer.crm.repository.InvestmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    public HttpResponse getAllInvestments() {
        HttpResponse response = new HttpResponse();
        try {
            List<Investment> investments = investmentRepository.findAll();
                response.setInvestments(investments);
                response.setStatusCode(200);
                response.setMessage("Success");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    public HttpResponse addInvestment(InvestmentDTO investmentDTO) {
        HttpResponse response = new HttpResponse();
        try {
            Investment investment = new Investment();
            investment.setName(investmentDTO.getName());
            investment.setContractSigningDate(investmentDTO.getContractSigningDate());
            investment.setCompletionDeadline(investmentDTO.getCompletionDeadline());
            investment.setContractAnnex(investmentDTO.getContractAnnex());
            investment.setNotes(investmentDTO.getNotes());
            investment.setConstructionSiteContact(investmentDTO.getConstructionSiteContact());
            investment.setResponsiblePerson(investmentDTO.getResponsiblePerson());
            investment.setSupervisionInspector(investmentDTO.getSupervisionInspector());

            investment.setJournalRegistration(investmentDTO.getJournalRegistration() );
            investment.setWorkStartNotification(investmentDTO.getWorkStartNotification());
            investment.setConstructionBoard(investmentDTO.getConstructionBoard() );

            investment.setBuildingProjectMinorChanges(investmentDTO.getBuildingProjectMinorChanges());
            investment.setExecutionProject(investmentDTO.getExecutionProject());
            investment.setStringDesign(investmentDTO.getStringDesign());
            investment.setMediumVoltageConnectionScope(investmentDTO.getMediumVoltageConnectionScope());
            investment.setAcceptanceProtocol(investmentDTO.getAcceptanceProtocol());
            investment.setOSDAcceptanceDocumentation(investmentDTO.getOSDAcceptanceDocumentation());
            investment.setClientAcceptanceDocumentation(investmentDTO.getClientAcceptanceDocumentation());

            investment.setPowerPlantConnection(investmentDTO.getPowerPlantConnection());
            investment.setPSPNotification(investmentDTO.getPSPNotification() );
            investment.setPINBNotification(investmentDTO.getPINBNotification());

            investment.setSurveyorStakeout(investmentDTO.getSurveyorStakeout());
            investment.setSurveyorInventory(investmentDTO.getSurveyorInventory());
            investment.setFenceDelivery(investmentDTO.getFenceDelivery());
            investment.setFenceConstruction(investmentDTO.getFenceConstruction());
            investment.setSiteSecurity(investmentDTO.getSiteSecurity());
            investment.setStructureDelivery(investmentDTO.getStructureDelivery());
            investment.setPiling(investmentDTO.getPiling());
            investment.setStructureAssembly(investmentDTO.getStructureAssembly());
            investment.setModuleDelivery(investmentDTO.getModuleDelivery());
            investment.setModuleInstallation(investmentDTO.getModuleInstallation());
            investment.setAssemblyMaterials(investmentDTO.getAssemblyMaterials());
            investment.setACWiringRoutes(investmentDTO.getACWiringRoutes());
            investment.setDCWiringRoutes(investmentDTO.getDCWiringRoutes());

            System.out.println(investmentDTO.getDCWiringRoutes());
            investment.setMediumVoltageWiringRoutes(investmentDTO.getMediumVoltageWiringRoutes());
            investment.setTransformerStation(investmentDTO.getTransformerStation());
            investment.setTelemechanics(investmentDTO.getTelemechanics());
            investment.setCCTV(investmentDTO.getCCTV());
            investment.setEquipotentialConnections(investmentDTO.getEquipotentialConnections());

            investmentRepository.save(investment);

            response.setInvestment(investment);
            response.setStatusCode(200);
            response.setMessage("Investment added successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }
    public HttpResponse getInvestmentById(Integer id) {
        HttpResponse response = new HttpResponse();
        try {
            Investment investment = investmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Investment not found"));

            response.setInvestment(investment);
            response.setStatusCode(200);
            response.setMessage("Investment with ID: " + id + " found successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    public HttpResponse updateInvestment(Integer id, InvestmentDTO investmentDTO) {
        HttpResponse response = new HttpResponse();
        try {
            Investment existingInvestment = investmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Investment not found"));

            existingInvestment.setName(investmentDTO.getName());
            existingInvestment.setContractSigningDate(investmentDTO.getContractSigningDate());
            existingInvestment.setCompletionDeadline(investmentDTO.getCompletionDeadline());
            existingInvestment.setContractAnnex(investmentDTO.getContractAnnex());
            existingInvestment.setNotes(investmentDTO.getNotes());
            existingInvestment.setConstructionSiteContact(investmentDTO.getConstructionSiteContact());
            existingInvestment.setResponsiblePerson(investmentDTO.getResponsiblePerson());
            existingInvestment.setSupervisionInspector(investmentDTO.getSupervisionInspector());

            existingInvestment.setJournalRegistration(investmentDTO.getJournalRegistration());
            existingInvestment.setWorkStartNotification(investmentDTO.getWorkStartNotification());
            existingInvestment.setConstructionBoard(investmentDTO.getConstructionBoard());

            existingInvestment.setBuildingProjectMinorChanges(investmentDTO.getBuildingProjectMinorChanges());
            existingInvestment.setExecutionProject(investmentDTO.getExecutionProject());
            existingInvestment.setStringDesign(investmentDTO.getStringDesign());
            existingInvestment.setMediumVoltageConnectionScope(investmentDTO.getMediumVoltageConnectionScope());
            existingInvestment.setAcceptanceProtocol(investmentDTO.getAcceptanceProtocol());
            existingInvestment.setOSDAcceptanceDocumentation(investmentDTO.getOSDAcceptanceDocumentation());
            existingInvestment.setClientAcceptanceDocumentation(investmentDTO.getClientAcceptanceDocumentation());

            existingInvestment.setPowerPlantConnection(investmentDTO.getPowerPlantConnection());
            existingInvestment.setPSPNotification(investmentDTO.getPSPNotification());
            existingInvestment.setPINBNotification(investmentDTO.getPINBNotification());

            existingInvestment.setSurveyorStakeout(investmentDTO.getSurveyorStakeout());
            existingInvestment.setSurveyorInventory(investmentDTO.getSurveyorInventory());
            existingInvestment.setFenceDelivery(investmentDTO.getFenceDelivery());
            existingInvestment.setFenceConstruction(investmentDTO.getFenceConstruction());
            existingInvestment.setSiteSecurity(investmentDTO.getSiteSecurity());
            existingInvestment.setStructureDelivery(investmentDTO.getStructureDelivery());
            existingInvestment.setPiling(investmentDTO.getPiling());
            existingInvestment.setStructureAssembly(investmentDTO.getStructureAssembly());
            existingInvestment.setModuleDelivery(investmentDTO.getModuleDelivery());
            existingInvestment.setModuleInstallation(investmentDTO.getModuleInstallation());
            existingInvestment.setAssemblyMaterials(investmentDTO.getAssemblyMaterials());
            existingInvestment.setACWiringRoutes(investmentDTO.getACWiringRoutes());
            existingInvestment.setDCWiringRoutes(investmentDTO.getDCWiringRoutes());
            existingInvestment.setMediumVoltageWiringRoutes(investmentDTO.getMediumVoltageWiringRoutes());
            existingInvestment.setTransformerStation(investmentDTO.getTransformerStation());
            existingInvestment.setTelemechanics(investmentDTO.getTelemechanics());
            existingInvestment.setCCTV(investmentDTO.getCCTV());
            existingInvestment.setEquipotentialConnections(investmentDTO.getEquipotentialConnections());

            investmentRepository.save(existingInvestment);

            response.setStatusCode(200);
            response.setMessage("Investment updated successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    public HttpResponse deleteInvestment(Integer id) {
        HttpResponse response = new HttpResponse();
        try {
            Investment investment = investmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Investment not found"));

            investmentRepository.delete(investment);

            response.setStatusCode(200);
            response.setMessage("Investment deleted successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }
}
