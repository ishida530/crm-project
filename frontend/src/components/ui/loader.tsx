import React from "react";
import { cn } from "@/lib/utils"; // Użyj swoich narzędzi do klas
import { ClipLoader } from "react-spinners"; // Importuj spinner z biblioteki

interface LoaderProps {
  size?: number; // Zmieniamy na number, aby dopasować do propsów react-spinners
  color?: string; // Dodajemy opcję koloru
  className?: string;
  isVisible: boolean; // Właściwość isVisible do kontrolowania widoczności loadera
}

export const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = "#4A90E2", // Domyślny kolor spinnera
  className,
  isVisible,
}) => {
  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", // Pozycjonowanie na środku ekranu
        "transition-opacity duration-300", // Animacja fade
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none", // Ukrywanie spinnera
        className
      )}
    >
      {isVisible && <ClipLoader size={size} color={color} />}
    </div>
  );
};
