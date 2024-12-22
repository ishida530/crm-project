package com.elemer.crm.service;

import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.dto.InvestmentDTO;
import com.elemer.crm.entity.Investment;
import com.elemer.crm.repository.InvestmentRepository;
import com.elemer.crm.util.EncryptionUtil;

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
            if (!investments.isEmpty()) {
                investments.forEach(this::decryptInvestmentData);
                response.setInvestments(investments);
                response.setStatusCode(200);
                response.setMessage("Success");
            } else {
                response.setStatusCode(404);
                response.setMessage("No investments found");
            }
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
            investment.setName(EncryptionUtil.encrypt(investmentDTO.getName()));
            // Set other properties
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

            decryptInvestmentData(investment);

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

            existingInvestment.setName(EncryptionUtil.encrypt(investmentDTO.getName()));
            // Update other properties
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

    private void decryptInvestmentData(Investment investment) {
        investment.setName(EncryptionUtil.decrypt(investment.getName()));
        // Decrypt other fields as needed
    }
}