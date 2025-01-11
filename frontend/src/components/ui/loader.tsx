import React from "react";
import { cn } from "@/lib/utils"; // Użyj swoich narzędzi do klas

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  isVisible: boolean; // Właściwość isVisible do kontrolowania widoczności loadera
}

export const Loader: React.FC<LoaderProps> = ({ size = "md", className, isVisible }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-t-2 border-gray-300 border-t-gray-500 transition-opacity duration-300", // Animacja fade
        sizeClasses[size],
        className,
        isVisible ? "opacity-100" : "opacity-0" // Kontrola widoczności loadera
      )}
    ></div>
  );
};
