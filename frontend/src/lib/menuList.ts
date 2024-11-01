import {
    Users,
    SquarePen,
    LayoutGrid,
    Folder,
    ShoppingBag,
    Package,
    LucideIcon
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/users",
                    label: "Użytkownicy",
                    icon: Users,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/clients",
                    label: "Klienci",
                    icon: Users,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/sales",
                    label: "Sprzedaż",
                    icon: ShoppingBag,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/products",
                    label: "Produkty",
                    icon: Package,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/inventory",
                    label: "Magazyn",
                    icon: Folder,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/",
                    label: "Projekty",
                    icon: SquarePen,
                    submenus: [
                        {
                            href: "/projects/tasks",
                            label: "Zadania",
                            active: false
                        },
                        {
                            href: "/projects/tasks",
                            label: "Zadania",
                            active: false
                        }
                    ]
                }
            ]
        }
    ];
}
