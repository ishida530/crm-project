package com.elemer.crm.enums;

public enum UserRole {
    ADMIN("ADMIN"),
    MANAGER("MANAGER"),
    EMPLOYEE("EMPLOYEE"),
    INVOICE_CLERK("INVOICE_CLERK"),
    DESIGNER("DESIGNER"),
    ENGINEER("ENGINEER"),
    WORKER("WORKER");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
