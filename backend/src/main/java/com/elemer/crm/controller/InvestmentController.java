package com.elemer.crm.controller;

import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.dto.InvestmentDTO;
import com.elemer.crm.service.InvestmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @GetMapping
    public ResponseEntity<HttpResponse> getAllInvestments() {
        return ResponseEntity.ok(investmentService.getAllInvestments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HttpResponse> getInvestmentById(@PathVariable Integer id) {
        return ResponseEntity.ok(investmentService.getInvestmentById(id));
    }

    @PostMapping
    public ResponseEntity<HttpResponse> addInvestment(@RequestBody InvestmentDTO investmentRequest) {
        HttpResponse response = investmentService.addInvestment(investmentRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpResponse> updateInvestment(@PathVariable Integer id, @RequestBody InvestmentDTO investmentRequest) {
        HttpResponse response = investmentService.updateInvestment(id, investmentRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpResponse> deleteInvestment(@PathVariable Integer id) {
        HttpResponse response = investmentService.deleteInvestment(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
