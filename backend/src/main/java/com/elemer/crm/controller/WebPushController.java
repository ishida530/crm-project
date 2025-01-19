package com.elemer.crm.controller;

import com.elemer.crm.entity.WebPushMessage;
import com.elemer.crm.entity.WebPushSubscription;
import com.elemer.crm.service.SubscriptionService;
import org.jose4j.lang.JoseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/")
public class WebPushController {
    public WebPushController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    private final SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public void subscribe(@RequestBody WebPushSubscription webPushSubscription){
        subscriptionService.saveSubscription(webPushSubscription);
    }

    @PostMapping("unsubscribe")
    public void unsubscribe(@RequestBody Integer id){
        subscriptionService.deleteSubscription(id);
    }

    @PostMapping("notifyUser/{userId}")
    public ResponseEntity<String> notifyUser(@RequestBody WebPushMessage message, @PathVariable Integer userId) throws JoseException, GeneralSecurityException, IOException, ExecutionException, InterruptedException {
        return subscriptionService.notifyUser(message, userId);
    }
}