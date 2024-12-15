import { Outlet, useNavigate } from "react-router-dom";
import { useSidebar } from "./hooks/use-sidebar";
import cn from "classnames";
import { AppSidebar } from "./components/common/AppSidebar";
import { useStore } from "./hooks/use-store";
import { Navbar } from "./components/common/Header";
import { useAuth } from "./features/auth/AuthProvier";
import { useEffect } from "react";
import { getToken, messaging, onMessage } from './firebase'; // Zaimportuj Firebase Messaging
import axiosInstance from "./api/api";


const App = () => {
  const sidebar = useStore(useSidebar, (x) => x);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  // Funkcja do uzyskiwania uprawnień i subskrybowania powiadomień
  // Funkcja do uzyskiwania uprawnień i subskrybowania powiadomień

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //     .then(function (registration) {
  //       console.log('Service Worker zarejestrowany pomyślnie: ', registration);


        
  //     })
  //     .catch(function (error) {
  //       console.error('Rejestracja Service Workera nie powiodła się: ', error);
  //     });
  // }

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BGQuZkwmFXmudPjn-k545IcQq8syG6PFNfe5OfeEKZfNr1xaxDB5ZO4mulxthS8uX4W5I-lgzDrp_IqJ78Awl24",
      });


      //We can send token to server
      console.log("Token generated : ", token);
      axiosInstance.post(`notification/send?token=${token}`, {
        "title": "Nowe powiadomienie",
        "body": "Masz nowe wiadomości w aplikacji!"
      }).then(res => {
        console.log('res', res)

      })
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }


  useEffect(() => {
    requestPermission();

    if (!isAuthenticated) {
      navigate('/login');
    }

  }, [isAuthenticated]);

  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;
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
