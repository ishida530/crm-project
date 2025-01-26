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
import useStore from "@/lib/store"; // Importujemy store z pliku store.ts

// Submenu type definition
type Submenu = {
    href: string; // ensure href is required for submenus
    label: string;
    active?: boolean;
    allowedRoles?: UserRole[];
    submenus?: Submenu[]; // this supports nested submenus
};

// Menu type definition
type Menu = {
    href: string; // href is required for menus
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[]; // nested submenus supported
    allowedRoles?: UserRole[];
};

// Function to filter and return menus based on user role
export function getMenuList(userRole: UserRole): Menu[] {
    const state = useStore.getState();  // Pobieramy stan store
    const projectGroups = state.projectGroups;
    return [
        // Dashboard Menu
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
            allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],  // Allowed roles for this menu
        },
        // Users Menu
        {
            href: "/users",
            label: "Użytkownicy",
            icon: Users,
            submenus: [],
            allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],  // Allowed roles for this menu
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
            allowedRoles: [UserRole.ADMIN, UserRole.ENGINEER, UserRole.MANAGER],  // Allowed roles for this menu
        },
        // Clients Menu with Submenu
        {
            label: "Klienci",
            icon: Users,
            submenus: [
                {
                    href: "/clients",
                    label: "Klienci",
                    allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],  // Allowed roles for this submenu
                },
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
            label: "Magazyn",
            icon: Folder,
            submenus: [
                {
                    href: "/warehouses",
                    label: "Magazyn",
                    allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],  // Allowed roles for this submenu
                },
                {
                    href: "/warehouses/products",
                    label: "Produkty",
                    allowedRoles: [UserRole.ADMIN, UserRole.INVOICE_CLERK],  // Allowed roles for this submenu
                }
            ], allowedRoles: [UserRole.ADMIN, UserRole.MANAGER],  // Allowed roles for this menu
        },
        // Projects Menu with Submenu
        {
            label: "Projekty",
            icon: SquarePen,
            submenus: [
                {
                    href: "/projects",
                    label: "Projekty",
                    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER],  // Allowed roles for this submenu
                },
                {
                    href: "/projects/templates",
                    label: "Szablony",
                    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER],
                },
                {
                    href: "/projects/groups",
                    label: "Grupy",
                    allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER],
                    submenus: projectGroups?.map(group => ({
                        href: `/projects/groups/${group.id}`,  // Poprawny sposób dołączenia zmiennej do stringa
                        label: group.name,
                    }))
                }
            ],
            allowedRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.DESIGNER],
        },
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
