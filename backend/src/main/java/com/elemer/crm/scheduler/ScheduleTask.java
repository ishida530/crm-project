package com.elemer.crm.scheduler;
import com.elemer.crm.entity.Task;
import com.elemer.crm.entity.WebPushMessage;
import com.elemer.crm.repository.TaskRepository;
import com.elemer.crm.service.SubscriptionServiceImpl;
import com.elemer.crm.service.TaskService;
import jakarta.transaction.Transactional;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public class ScheduleTask {

    @Autowired
    private TaskRepository taskRepository;


    @Autowired
    private TaskService taskService;

    @Autowired
    private SubscriptionServiceImpl subscriptionService;

    @Transactional
    @Scheduled(fixedRate = 5000)
    public void getTasks() throws JoseException, GeneralSecurityException, IOException, ExecutionException, InterruptedException {
        Date now = new Date();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.MINUTE, 30);
        Date in30Minutes = calendar.getTime();

        List<Task> tasks = taskRepository.findAllStartingWithinMinutes(30);
        System.out.println(tasks);
        tasks.forEach(task -> System.out.println(task.getStart_date()));

        System.out.println("Zadania zaczynające się za 30 minut lub mniej:");
        for (Task task : tasks) {
            System.out.println("wysyla powiadomienie wiadaomosc...");

            WebPushMessage pushMessage = new WebPushMessage();
            pushMessage.setMessage(task.getDescription());
            pushMessage.setTitle(task.getName());


            subscriptionService.notifyUser(pushMessage,task.getAuthor().getId());

            System.out.println("wiadomosc zostala wyslana");
            task.setNotification_sent(1);
            System.out.println("zmieniono w bazie");

            taskRepository.save(task);
        }
    }
}
