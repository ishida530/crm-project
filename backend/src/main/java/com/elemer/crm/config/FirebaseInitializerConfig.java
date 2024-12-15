package com.elemer.crm.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseInitializerConfig {


    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException {
        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource("firebase-config.json").getInputStream());
        FirebaseOptions firebaseOptions = FirebaseOptions
                .builder()
                .setCredentials(googleCredentials)
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(firebaseOptions);
        return FirebaseMessaging.getInstance(app);
    }

//    @PostConstruct
//    public void initializeFirebase() {
//        try {
//
//
//
//            InputStream serviceAccount = new ClassPathResource("firebase-config.json").getInputStream();
//
//            // Ensuring correct initialization with the service account
//
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .build();
//
//            FirebaseApp.initializeApp(options);
//            System.out.println("Firebase initialized successfully!");
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Failed to initialize Firebase");
//        }
//    }
}
