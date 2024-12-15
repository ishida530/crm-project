package com.elemer.crm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

public class NotificationSender {





//    public static void sendNotification(String token) {
//        try {
//            // Tworzenie wiadomości z tokenem urządzenia
//            Message message = Message.builder()
//                    .setToken(token) // Token urządzenia uzyskany z frontendu
//                    .setNotification(Notification.builder()
//                            .setTitle("Tytuł powiadomienia")
//                            .setBody("Treść powiadomienia")
//                            .build())
//                    .build();
//
//            // Wysłanie wiadomości przez Firebase
//            try {
//                // Attempt to send the notification
//                String response = FirebaseMessaging.getInstance().send(message);
//                System.out.println("Wysłano wiadomość: " + response);
//            } catch (FirebaseMessagingException e) {
//                System.err.println("Błąd podczas wysyłania wiadomości: " + e.getMessage());
//                e.printStackTrace();
//                // Optionally, log the error code to understand the issue better
//                if (e.getMessage().contains("token")) {
//                    System.err.println("Token related issue");
//                }
//            }
//        } catch (Exception e) {
//            System.err.println("Błąd podczas wysyłania wiadomości: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
}
