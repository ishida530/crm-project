import { useEffect, memo } from "react";
import { ModeToggle } from "../ui/ModeToggle";
import { SheetMenu } from "./SheetMenu";
import { UserNav } from "./UserNav";

interface NavbarProps {
    title: string;
    isAuthenticated: boolean;
}

export const Navbar = memo(({ title, isAuthenticated }: NavbarProps) => {
    useEffect(() => {console.log(isAuthenticated) }, [isAuthenticated]); 

    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    {isAuthenticated && <SheetMenu />}
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <ModeToggle />
                    {isAuthenticated && <UserNav />}
                </div>
            </div>
        </header>
    );
});

