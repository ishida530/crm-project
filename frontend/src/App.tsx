import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // Import SidebarProvider
import { AppSidebar } from './components/common/AppSidebar'; // Import AppSidebar


const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const location = useLocation(); // Get the current location

  // Check if the current path is '/login'
  const isLoginPage = location.pathname === '/login';

  return (
    <SidebarProvider>
      <div className={`flex h-screen relative ${isLoginPage ? 'w-full' : ''}`}>
        {/* Only show SidebarTrigger if not on the login page */}
        {!isLoginPage && (
          <>
            <SidebarTrigger
              onClick={() => setIsOpen(!isOpen)}
              className="p-4 md:hidden absolute"
            >
              ☰ {/* Menu icon */}
            </SidebarTrigger>
            <AppSidebar />
          </>
        )}
    
        <main className={`flex flex-col  ${isLoginPage ? 'w-full' : 'flex-1'}`}>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default App;
