import React from "react";
import { cn } from "@/lib/utils"; // shadcn utils

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-t-2 border-gray-300 border-t-gray-500",
        sizeClasses[size],
        className
      )}
    ></div>
  );
};
