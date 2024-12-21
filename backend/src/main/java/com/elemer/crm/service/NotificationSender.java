package com.elemer.crm.service;

import com.elemer.crm.entity.Task;
import com.elemer.crm.entity.User;
import com.elemer.crm.repository.UsersRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationSender {

    @Autowired
    private UsersRepository usersRepository;

    public void sendNotification(Integer userId, Task task) {
        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not found"));

        String token = user.getTokenFcm().replace("\"", "");
        if (token == null || token.isEmpty()) {
            System.err.println("Brak tokenu FCM dla użytkownika o ID: " + userId);
            return;
    }

        System.err.println("FCM:" + token);
        System.err.println("task" + task);

        try {
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(task.getName())
                            .setBody(task.getDescription())
                            .build())
                    .build();

            FirebaseMessaging.getInstance().send(message);
            System.out.println("Powiadomienie wysłane: " + task.getName());
        } catch (FirebaseMessagingException e) {
            System.err.println("Błąd podczas wysyłania wiadomości: " + e.getMessage());
            e.printStackTrace();
        }
    }

}