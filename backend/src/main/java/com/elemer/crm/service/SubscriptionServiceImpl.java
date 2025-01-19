package com.elemer.crm.service;

import com.elemer.crm.entity.WebPushMessage;
import com.elemer.crm.entity.WebPushSubscription;
import com.elemer.crm.repository.SubscriptionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private static final String PUBLIC_KEY = "BH_0TzWGhmNPUi7nTStoQnFKLhY8-yJlkpqoc68xN6asBJqciDxE0D8Ws-T20Rbu7lsIDftkIpqfwnG-AHyBhPA";
    private static final String PRIVATE_KEY = "CKl7Fu8miQEauPHKKtUpPP5ztjUtR8L5m-bBDukoqVw";
    private static final String SUBJECT = "CRM-ELEMER";
    private ObjectMapper objectMapper;

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionServiceImpl(ObjectMapper objectMapper, SubscriptionRepository subscriptionRepository) {
        this.objectMapper = objectMapper;
        this.subscriptionRepository = subscriptionRepository;
    }

    public void saveSubscription(WebPushSubscription subscription) {
        System.out.println("subscription: " + subscription);

        // Sprawdzamy, czy już istnieje rekord z tym user_id
        Optional<WebPushSubscription> existingSubscription = Optional.ofNullable(subscriptionRepository.findByUserId(subscription.getUser_id()));

        if (existingSubscription.isPresent()) {
            WebPushSubscription existing = existingSubscription.get();
            System.out.println("Found existing subscription for userId: " + existing.getUser_id());

            // Aktualizujemy wartości istniejącego rekordu
            existing.setPublic_key(subscription.getPublic_key());
            existing.setAuth(subscription.getAuth());
            existing.setNotificationEndPoint(subscription.getNotificationEndPoint());

            // Zapisujemy zaktualizowany rekord
            subscriptionRepository.save(existing); // Nadpisanie istniejącego rekordu
            System.out.println("Updated existing subscription with userId: " + subscription.getUser_id());
        } else {
            // Jeśli nie znaleziono istniejącego, zapisz nowy rekord
            subscriptionRepository.save(subscription);
            System.out.println("Saved new subscription for userId: " + subscription.getUser_id());
        }
    }

    public void deleteSubscription(Integer id){
        subscriptionRepository.deleteById(id);
    }

    public WebPushSubscription findByNotificationEndPoint(String notification){
        return subscriptionRepository.findByNotificationEndPoint(notification);  // Updated method call
    }

    public ResponseEntity<String> notifyUser(WebPushMessage message,Integer userId) throws GeneralSecurityException, IOException, JoseException, ExecutionException, InterruptedException {
        Security.addProvider(new BouncyCastleProvider());
        WebPushSubscription subscription = subscriptionRepository.findByUserId(userId);
        PushService pushService=new PushService(PUBLIC_KEY,PRIVATE_KEY,SUBJECT);
            Notification notification=new Notification(
                    subscription.getNotificationEndPoint(),
                    subscription.getPublic_key(),
                    subscription.getAuth(),
                    objectMapper.writeValueAsBytes(message)

            );
            pushService.send(notification);

        return ResponseEntity.ok("Notifications sent successfully");

    }
}
