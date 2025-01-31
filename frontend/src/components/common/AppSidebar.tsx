import { Menu } from "@/components/common/Menu";
import { SidebarToggle } from "@/components/common/SidebarToggle";
import { Button } from "@/components/ui/button";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";
import { useAuth } from "@/features/auth/AuthProvier";

export function AppSidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  const location = useLocation();


  const { logout } = useAuth();
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 my-4 overflow-y-auto shadow-md dark:shadow-zinc-800  "
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 hover:no-underline",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.ico" className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !getOpenState()
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              CRM
            </h1>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} currentPath={location.pathname} onSignOut={logout} />
      </div>
    </aside>
  );
}
