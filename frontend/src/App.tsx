import { Outlet } from "react-router-dom";
import { useSidebar } from "./hooks/use-sidebar";
import cn from "classnames";
import { AppSidebar } from "./components/common/AppSidebar";
import { useStore } from "./hooks/use-store";
import { Navbar } from "./components/common/Header";

const App = () => {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;
  const isLoginPage = window.location.pathname === '/login';


  return (
    <div className="flex flex-col min-h-screen w-full">
      {!isLoginPage && <AppSidebar />}
      <main
        className={cn(
          "min-h-[calc(100vh-56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 max-h-full",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        <Navbar title="Elemer" />
        <Outlet />
      </main>
      <footer className="p-6 md:py-0 border-t border-border/40">
        <div className=" flex flex-col items-center justify-center md:h-24 md:flex-row">
          &copy; Elemer
        </div>
      </footer>
    </div>
  );
};

export default App;
