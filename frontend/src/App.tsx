import { Outlet, useNavigate } from "react-router-dom";
import { useSidebar } from "./hooks/use-sidebar";
import cn from "classnames";
import { AppSidebar } from "./components/common/AppSidebar";
import { useStore } from "./hooks/use-store";
import { Navbar } from "./components/common/Header";
import { useAuth } from "./features/auth/AuthProvier";
import { useEffect } from "react";

const App = () => {
  const sidebar = useStore(useSidebar, (x) => x);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;
  console.log('isAuthenticated', isAuthenticated)
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        {isAuthenticated && <AppSidebar />}
        <div className={cn(
          "flex flex-col w-full bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 max-h-full",
          !settings.disabled && (!getOpenState() ?
            (isAuthenticated ? 'lg:ml-[90px]' : "w-100") :
            (isAuthenticated ? "lg:ml-72" : 'w-100'))
        )}>
          {isAuthenticated && <Navbar title="Elemer" isAuthenticated={isAuthenticated} />}

          <main className="flex-grow p-10 overflow-y-auto">
            <Outlet />
          </main>
          <footer className="p-6 md:py-0 border-t border-border/40">
            <div className="flex flex-col items-center justify-center md:h-24 md:flex-row">
              &copy; Elemer
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
