import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; 
import { AppSidebar } from './components/common/AppSidebar'; 


const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <SidebarProvider>
      <div className={`flex h-screen relative ${isLoginPage ? 'w-full' : ''}`}>
        {!isLoginPage && (
          <>
            <SidebarTrigger
              onClick={() => setIsOpen(!isOpen)}
              className="p-4 md:hidden absolute"
            >
          
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
