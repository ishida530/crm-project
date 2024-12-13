package com.elemer.crm.service;

import com.elemer.crm.dto.LoginRequest;
import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.entity.User;
import com.elemer.crm.repository.UsersRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UsersService {
    Dotenv dotenv = Dotenv.load();

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    public HttpResponse register(HttpResponse registrationRequest) {
        HttpResponse response = new HttpResponse();
        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setPhoneNumber(registrationRequest.getPhoneNumber());
            user.setRole(registrationRequest.getRole());
            user.setEmail(registrationRequest.getEmail());
            user.setName(registrationRequest.getName());
            String generatedPassword = generateRandomPassword();
            user.setPassword(passwordEncoder.encode(generatedPassword));

            String emailContent = "Hello " + registrationRequest.getName() + ",\n\n"
                    + "Your account has been created successfully.\n\n"
                    + "Login: " + registrationRequest.getEmail() + "\n"
                    + "Password: " + generatedPassword + "\n\n"
                    + "Please change your password after logging in.";

            emailService.sendSimpleEmail(registrationRequest.getEmail(), "Welcome to CRM", emailContent);
            System.out.println(user);

            User userResult = usersRepository.save(user);
            System.out.println(userResult);

            if (userResult.getId() > 0) {
                response.setUser((userResult));
                response.setMessage("User save Succesfuly");
                response.setStatusCode(200);
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    private String generateRandomPassword() {
        int length = 10;

        String chars = dotenv.get("STRING_PASSWORD");
        System.out.println("Wygenerowane hasło: " +chars);

        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * chars.length());
            password.append(chars.charAt(index));
        }
        System.out.println("Wygenerowane hasło: " + password.toString());
        return password.toString();
    }

    public HttpResponse login(LoginRequest loginRequest) {
        HttpResponse response = new HttpResponse();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            var user = usersRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new NoSuchElementException("User not found"));

            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully logged in");
            response.setSuccess(true);


        } catch (Exception e) {
            response.setSuccess(false);
            if (e instanceof NoSuchElementException) {
                response.setStatusCode(404);
                response.setError("User not found");
            } else if (e instanceof BadCredentialsException) {
                response.setStatusCode(401);
                response.setError("Invalid credentials");
            } else {
                response.setError("Internal Server Error: " + e.getMessage());
                response.setError("Invalid credentials");
            }
        }
        return response;
    }




    public HttpResponse refreshToken(HttpResponse refreshTokenReqiest){
        HttpResponse response = new HttpResponse();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            User users = usersRepository.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        } catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }


    public HttpResponse getAllUsers() {
        HttpResponse httpResponse = new HttpResponse();
        try {
            List<User> result = usersRepository.findAll();
            if (!result.isEmpty()) {
                httpResponse.setUserList(result);
                httpResponse.setStatusCode(200);
                httpResponse.setMessage("Successful");
            } else {
                httpResponse.setStatusCode(404);
                httpResponse.setMessage("No users found");
            }
            return httpResponse;
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
            return httpResponse;
        }
    }


    public HttpResponse getUsersById(Integer id) {
        HttpResponse httpResponse = new HttpResponse();
        try {
            User usersById = usersRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            httpResponse.setUser(usersById);
            httpResponse.setStatusCode(200);
            httpResponse.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
        }
        return httpResponse;
    }


    public HttpResponse deleteUser(Integer userId) {
        HttpResponse httpResponse = new HttpResponse();
        try {
            Optional<User> userOptional = usersRepository.findById(userId);
            if (userOptional.isPresent()) {
                usersRepository.deleteById(userId);
                httpResponse.setStatusCode(200);
                httpResponse.setMessage("User deleted successfully");
            } else {
                httpResponse.setStatusCode(404);
                httpResponse.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return httpResponse;
    }

    public HttpResponse updateUser(Integer userId, User updatedUser) {
        HttpResponse httpResponse = new HttpResponse();
        try {
            Optional<User> userOptional = usersRepository.findById(userId);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
                existingUser.setRole(updatedUser.getRole());

                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = usersRepository.save(existingUser);
                httpResponse.setUser(savedUser);
                httpResponse.setStatusCode(200);
                httpResponse.setMessage("User updated successfully");
            } else {
                httpResponse.setStatusCode(404);
                httpResponse.setMessage("User not found for update");
            }
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return httpResponse;
    }


    public HttpResponse getMyInfo(String email){
        HttpResponse httpResponse = new HttpResponse();
        try {
            Optional<User> userOptional = usersRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                httpResponse.setUser(userOptional.get());
                httpResponse.setStatusCode(200);
                httpResponse.setMessage("successful");
            } else {
                httpResponse.setStatusCode(404);
                httpResponse.setMessage("User not found for update");
            }

        }catch (Exception e){
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return httpResponse;

    }

}
