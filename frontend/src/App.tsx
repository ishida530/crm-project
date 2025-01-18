import { Outlet, useNavigate } from "react-router-dom";
import { useSidebar } from "./hooks/use-sidebar";
import cn from "classnames";
import { AppSidebar } from "./components/common/AppSidebar";
import { useStore } from "./hooks/use-store";
import { Navbar } from "./components/common/Header";
import { useAuth } from "./features/auth/AuthProvier";
import { useEffect } from "react";
import { getToken, messaging } from './firebase'; // Zaimportuj Firebase Messaging
import { useSaveFcmToken } from "./hooks/useSaveFcmToken";
import { Loader } from "./components/ui/loader";


const App = () => {
  const sidebar = useStore(useSidebar, (x) => x);
  const { isAuthenticated } = useAuth();
  const { mutate: saveTokenFcm } = useSaveFcmToken()
  const navigate = useNavigate();

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BFnc_MC0es0u_AOzFDz1M2GAp2DDbRGIdReLAF69E0m0MR9wTor1tGYcFmIFWYMzm93RCI7ns30dUF986XN4U9M",
      });


      //We can send token to server
      console.log("Token generated : ", token);
      const userId = localStorage.getItem('userId');

      if (userId) {
        saveTokenFcm({
          userId: Number(userId),
          token: token,
        });
      }
      // axiosInstance.post(`notification/send?token=${token}`, {
      //   title: "Nowe powiadomienie",
      //   body: "Masz nowe wiadomości w aplikacji!"
      // }).then(res => {
      //   console.log('response: ', res)

      // })
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }


  useEffect(() => {

    if (!isAuthenticated) {
      navigate('/login');
    } else {
      requestPermission();
    }

  }, [isAuthenticated]);

  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        {isAuthenticated && <AppSidebar />}
        <div className={cn(
          "flex flex-col w-full overflow-auto bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 max-h-full",
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
