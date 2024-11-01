import { MenuIcon, PanelsTopLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/common/Menu';
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from '@/components/ui/sheet';
import { useLocation, useNavigate } from 'react-router-dom';

export function SheetMenu() {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center gap-2">
              <PanelsTopLeft className="w-6 h-6 mr-1" />
              <SheetTitle className="font-bold text-lg">Brand</SheetTitle>
            </div>
          </Button>
        </SheetHeader>
        <Menu isOpen currentPath={location.pathname} onSignOut={() => { console.log('wylogowanie?') }} />
      </SheetContent>
    </Sheet>
  );
}
