import { UserRole } from "@/features/users/types";
import {
    Users,
    SquarePen,
    LayoutGrid,
    Folder,
    LucideIcon,
    DollarSign,
    Car,
} from "lucide-react";

// Submenu type definition
type Submenu = {
    href: string;
    label: string;
    active?: boolean;
    allowedRoles?: UserRole[];
};

// Menu type definition
type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
    allowedRoles?: UserRole[];
};

// Function to filter and return menus based on user role
export function getMenuList(userRole: UserRole): Menu[] {
    return [
        // Dashboard Menu
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
            allowedRoles: [UserRole.ADMIN],  // Allowed roles for this menu
        },
        // Users Menu
        {
            href: "/users",
            label: "Użytkownicy",
            icon: Users,
            submenus: [],
            allowedRoles: [UserRole.ADMIN],  // Allowed roles for this menu
        },
        {
            href: "/users/attendance",
            label: "Lista obecnosci",
            icon: Users,
            submenus: [],
            allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],
        },
        // Investemnts Menu
        {
            href: "/investments",
            label: "Inwestycje",
            icon: DollarSign,
            submenus: [],
            allowedRoles: [UserRole.ADMIN, UserRole.ENGINEER],  // Allowed roles for this menu
        },
        // Clients Menu with Submenu
        {
            href: "/clients",
            label: "Klienci",
            icon: Users,
            submenus: [
                {
                    href: "/clients/groups",
                    label: "Grupy Klientów",
                    allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],  // Allowed roles for this submenu
                }
            ],
            allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],  // Allowed roles for this menu
        },
        // Warehouses Menu
        {
            href: "/warehouses",
            label: "Magazyn",
            icon: Folder,
            submenus: [
                {
                    href: "/warehouses/products",
                    label: "Produkty",
                    allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],  // Allowed roles for this submenu
                }
            ], allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],  // Allowed roles for this menu
        },
        // Projects Menu with Submenu
        {
            href: "/projects",
            label: "Projekty",
            icon: SquarePen,
            submenus: [
                {
                    href: "/projects/templates",
                    label: "Szablony projektów",
                    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER],  // Allowed roles for this submenu
                },
                {
                    href: "/projects/groups",
                    label: "Grupy projektów",
                    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER],  // Allowed roles for this submenu
                }
            ],
            allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.DESIGNER],  // Allowed roles for this menu
        },
        // Users Menu
        {
            href: "/vehicles",
            label: "Flota samochodowa",
            icon: Car,
            submenus: [],
            allowedRoles: [UserRole.ADMIN],  // Allowed roles for this menu
        },

    ]
        .filter(menu =>
            // Filter main menus based on allowed roles
            menu.allowedRoles?.includes(userRole) || !menu.allowedRoles
        ).map(menu => ({
            ...menu,
            submenus: menu.submenus?.filter(submenu =>
                // Filter submenus based on allowed roles
                submenu.allowedRoles?.includes(userRole) || !submenu.allowedRoles
            )
        }));
}
