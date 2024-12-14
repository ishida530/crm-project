import { LogOut } from 'lucide-react';
import cn from 'classnames';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getMenuList } from '@/lib/menuList';
import { CollapseMenuButton } from '@/components/common/CollapseMenuButton';
import { Link } from 'react-router-dom';
import { UserRole } from '@/features/users/types';

interface MenuProps {
  isOpen: boolean | undefined;
  currentPath: string;
  onSignOut: () => void;
}

export function Menu({ isOpen, currentPath = "", onSignOut }: MenuProps) {
  // Get the menu list based on user role or state

  const userRole = localStorage.getItem('role')
  const menuList = getMenuList(userRole as UserRole);

  return (
    <nav className="mt-8 h-full w-full">
      <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
        {/* Loop through individual menu items */}
        {menuList.map(({ href, label, icon: Icon, active, submenus }, index) => (
          <li className="w-full" key={index}>
            {/* Render menu item */}
            {!submenus || submenus.length === 0 ? (
              <div className="w-full">
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Link to={href} className="flex items-center w-full">
                        <Button
                          variant={
                            (active === undefined && currentPath.startsWith(href)) || active
                              ? "secondary"
                              : "ghost"
                          }
                          className="w-full justify-start h-10 mb-1"
                        >
                          <span className={cn(isOpen === false ? "" : "mr-4")}>
                            <Icon size={18} />
                          </span>
                          <p
                            className={cn(
                              "max-w-[200px] truncate",
                              isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100"
                            )}
                          >
                            {label}
                          </p>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">{label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <div className="w-full">
                <CollapseMenuButton
                  icon={Icon}
                  label={label}
                  href={href}
                  active={active === undefined ? currentPath.startsWith(href) : active}
                  submenus={submenus}
                  isOpen={isOpen}
                />
              </div>
            )}
          </li>
        ))}

        <li className="w-full grow flex items-end">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  onClick={onSignOut}
                  variant="outline"
                  className="w-full justify-center h-10 mt-5"
                >
                  <span className={cn(isOpen === false ? "" : "mr-4")}>
                    <LogOut size={18} />
                  </span>
                  <p
                    className={cn(
                      "whitespace-nowrap transition ease-in-out delay-150",
                      isOpen === false ? "opacity-0 hidden" : "opacity-100"
                    )}
                  >
                    Sign out
                  </p>
                </Button>
              </TooltipTrigger>
              {isOpen === false && (
                <TooltipContent side="right">Sign out</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  );
}
