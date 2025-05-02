
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Главная", href: "/" },
    { title: "Услуги", href: "/services" },
    { title: "Магазин", href: "/shop" },
    { title: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <Icon name="Scissors" size={24} />
          <span>СТИЛЬ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/login">Войти</Link>
          </Button>
          <Button asChild>
            <Link to="/book">Записаться</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 py-6">
              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Войти
                  </Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/book">Записаться</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
