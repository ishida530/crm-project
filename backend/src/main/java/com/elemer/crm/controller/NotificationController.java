package com.elemer.crm.controller;

import com.elemer.crm.dto.Note;
import com.elemer.crm.service.FirebaseMessagingService;
import com.elemer.crm.service.NotificationSender;
import com.google.firebase.messaging.FirebaseMessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
public class NotificationController {

//    @PostMapping("/send")
//    public String sendNotification(@RequestBody TokenRequest request) {
//        NotificationSender.sendNotification(request.getToken());
//        return "Powiadomienie zostało wysłane!";
//    }

    @Autowired
    FirebaseMessagingService firebaseMessagingService;

    @PostMapping("/send")
    public String sendNotification(@RequestBody Note note,
                                   @RequestParam String token) throws FirebaseMessagingException {
        return firebaseMessagingService.sendNotification(note, token);
    }

}