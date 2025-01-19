package com.elemer.crm.service;

import com.elemer.crm.entity.WebPushMessage;
import com.elemer.crm.entity.WebPushSubscription;
import org.jose4j.lang.JoseException;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;


public interface SubscriptionService {
    void saveSubscription(WebPushSubscription subscription);
    void deleteSubscription(Integer id);
    WebPushSubscription findByNotificationEndPoint(String notification);
    ResponseEntity<String> notifyUser(WebPushMessage message, Integer userId) throws GeneralSecurityException, IOException, JoseException, ExecutionException, InterruptedException;

}