package com.elemer.crm.controller;

import com.elemer.crm.dto.LoginRequest;
import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.entity.User;
import com.elemer.crm.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/auth/register")
    public ResponseEntity<HttpResponse> register(@RequestBody HttpResponse registration) {
        return ResponseEntity.ok(usersService.register(registration));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<HttpResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(usersService.login(request));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<HttpResponse> refreshToken(@RequestBody HttpResponse request) {
        return ResponseEntity.ok(usersService.refreshToken(request));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<HttpResponse> getAllUsers(){
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<HttpResponse> getUserByID(@PathVariable Integer userId) {
        return ResponseEntity.ok(usersService.getUsersById(userId));
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<HttpResponse> updateUser(@PathVariable Integer userId, @RequestBody User request) {
        return ResponseEntity.ok(usersService.updateUser(userId,request));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<HttpResponse> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        HttpResponse response = usersService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body((response));
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<HttpResponse> deleteUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(usersService.deleteUser(userId));
    }
}
