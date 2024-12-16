package com.elemer.crm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;

public class NotificationSender {

//
//    public static void saveToken(String token) {
//
//    }


    public static void sendNotification(String token) {
        try {
            // Tworzenie wiadomości z tokenem urządzenia
            Message message = Message.builder()
                    .setToken(token) // Token urządzenia uzyskany z frontendu
                    .setNotification(Notification.builder()
                            .setTitle("Tytuł powiadomienia")
                            .setBody("Treść powiadomienia")
                            .build())
                    .build();
        } catch (Exception e) {
            System.err.println("Błąd podczas wysyłania wiadomości: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
