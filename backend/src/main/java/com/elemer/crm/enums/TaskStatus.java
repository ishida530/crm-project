package com.elemer.crm.enums;

public enum TaskStatus {
    TO_DO("TO_DO"),
    IN_PROGRESS("IN_PROGRESS"),
    COMPLETED("COMPLETED");

    private final String value;

    TaskStatus(String value) {
        this.value = value;
    }
}