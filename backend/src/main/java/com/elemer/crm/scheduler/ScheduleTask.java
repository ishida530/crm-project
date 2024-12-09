package com.elemer.crm.scheduler;
import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.Task;
import com.elemer.crm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class ScheduleTask {

    @Autowired
    private TaskRepository taskRepository;

    @Scheduled(fixedRate = 5000)
    public void getTasks() {
        Date now = new Date();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.MINUTE, 30);
        Date in30Minutes = calendar.getTime();

        List<Task> tasks = taskRepository.findAllStartingWithinMinutes(30);

        System.out.println("Zadania zaczynające się za 30 minut lub mniej:");
        for (Task task : tasks) {
            System.out.println(task.getName() + " - " + task.getStartDate());

            task.setNotificationSent(1);
            taskRepository.save(task);
        }
    }
}
