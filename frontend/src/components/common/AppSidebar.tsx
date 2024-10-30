import { Calendar, Home, Inbox, Search, Settings, Projector } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui/button";
import ProjectsPage from "@/features/projects/ProjectsPage";

const items = [
  {
    title: "Klienci",
    url: "/clients",
    icon: Home,
  },
  {
    title: "Sprzedaż",
    url: "/sales",
    icon: Inbox,
  },
  {
    title: "Produkty",
    url: "/products",
    icon: Calendar,
  },
  {
    title: "Magazyn",
    url: "/inventory",
    icon: Search,
  },
  {
    title: "Użytkownicy",
    url: "/users",
    icon: Settings,
  },
  {
    title: "Projekty",
    url: "/projects",
    icon: Projector,
  },
];

export function AppSidebar() {
  const { isDarkMode, toggleDarkMode } = useTheme();


  return (
    <div className="flex flex-col">

      <Sidebar className={`bg-white shadow-lg transition-transform duration-300 md:translate-x-0`}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="p-4 text-lg font-semibold">Nawigacja CRM</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center p-2 rounded hover:bg-gray-200 transition-colors">
                        <item.icon className="mr-2" /> {/* Icon with margin */}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

              <Button
                onClick={toggleDarkMode}
                className="text-sm text-blue-500 hover:underline mt-4"
              >
                Toggle Dark Mode
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
