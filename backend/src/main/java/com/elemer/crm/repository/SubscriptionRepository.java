package com.elemer.crm.repository;

import com.elemer.crm.entity.WebPushSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscriptionRepository extends JpaRepository<WebPushSubscription, Integer> {

    WebPushSubscription findByNotificationEndPoint(String notificationEndPoint);

    @Query(value = "SELECT * FROM web_push_subscription WHERE user_id = :userId", nativeQuery = true)
    WebPushSubscription findByUserId(@Param("userId") Integer userId);

}
