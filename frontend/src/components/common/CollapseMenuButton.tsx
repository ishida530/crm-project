import React, { useState } from "react";
import { ChevronDown, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLocation, Link } from "react-router-dom";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { UserRole } from "@/features/users/types";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  submenus?: Submenu[]; // This allows nested submenus
};


interface CollapseMenuButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
  href: string
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  submenus,
  isOpen,
  href
}: CollapseMenuButtonProps) {
  const location = useLocation();
  const isSubmenuActive = submenus.some((submenu) =>
    submenu.active === undefined ? submenu.href === location.pathname : submenu.active
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  // Recursive function to render submenus
  const renderSubmenus = (submenus: Submenu[]) => {
    return submenus.map(({ href, label, active, submenus }, index) => (
      <div key={index}>
        <Link to={href}>
          <Button
            variant={
              (active === undefined && location.pathname === href) || active
                ? "secondary"
                : "ghost"
            }
            className="w-full justify-start h-10 mb-1 w100"
          >
            <span className="mr-4 ml-2">
              <Dot size={18} />
            </span>
            <p
              className={`max-w-[170px] truncate ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"}`}
            >
              {label}
            </p>
          </Button>
        </Link>
        {/* Render nested submenus recursively */}
        {submenus && submenus.length > 0 && (
          <div className="pl-4">
            {renderSubmenus(submenus)}
          </div>
        )}
      </div>
    )
    );
  };

  return isOpen ? (
    <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant={isSubmenuActive ? "secondary" : "ghost"}
          className="w-full justify-start h-10"
          asChild
        >
          <Link to={href}>
            <div className="w-full items-center flex justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <Icon size={18} />
                </span>
                <p className={`max-w-[150px] truncate ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"}`}>
                  {label}
                </p>
              </div>
              <div className={`whitespace-nowrap ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"}`}>
                <ChevronDown size={18} className="transition-transform duration-200" />
              </div>
            </div>
          </Link>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {renderSubmenus(submenus)}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isSubmenuActive ? "secondary" : "ghost"}
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={isOpen === false ? "" : "mr-4"}>
                      <Icon size={18} />
                    </span>
                    <p className={`max-w-[200px] truncate ${isOpen === false ? "opacity-0" : "opacity-100"}`}>
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderSubmenus(submenus)} {/* Render nested submenus here */}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
