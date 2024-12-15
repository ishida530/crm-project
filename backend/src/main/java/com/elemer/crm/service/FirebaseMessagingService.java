package com.elemer.crm.service;

import com.elemer.crm.dto.Note;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.stereotype.Service;

@Service
public class FirebaseMessagingService {

    private final FirebaseMessaging firebaseMessaging;

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }


    public String sendNotification(Note note, String token) throws FirebaseMessagingException {
        try {
        Notification notification = Notification
                .builder()
                .setTitle(note.getTitle())
                .setBody(note.getBody())
                .build();


            Message message = Message.builder()
                    .setToken(token)  // Token użytkownika
                    .setNotification(notification)
                    .build();


            String response = firebaseMessaging.send(message);
            System.out.println("Notification sent: " + response);
            return response;
        } catch (FirebaseMessagingException e) {
            System.err.println("Error sending notification: " + e.getMessage());
            throw e; // Przekaż błąd dalej, jeśli chcesz obsłużyć go później
        }

    }

}