"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const session = false;

  const navItems = [{ href: "#profissionais", label: "Profissionais" }];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          onClick={() => setIsOpen(false)}
          className="bg-emerald-500 py-5 font-bold md:bg-transparent text-black hover:bg-transparent hover:text-emerald-500"
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}

      {session ? (
        <Button
          onClick={() => setIsOpen(false)}
          className="bg-emerald-500 py-5 font-bold md:bg-transparent text-black hover:bg-transparent hover:text-emerald-500"
        >
          <Link href="/minha-conta">Minha Conta</Link>
        </Button>
      ) : (
        <Button
          onClick={() => setIsOpen(false)}
          className="bg-emerald-500 py-5 font-bold md:bg-transparent text-black hover:bg-transparent hover:text-emerald-500"
        >
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 w-full bg-white shadow-md z-999 py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-800">
            Odonto<span className="text-emerald-500">Pro</span>
          </h1>
        </Link>
        <nav className="hidden md:flex  space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button
                className="text-black hover:bg-transparent "
                variant={"ghost"}
                size={"icon"}
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-60 sm:w-75 z-9999 items-start text-black"
          >
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              <SheetDescription className="text-gray-600">
                Navegue pelo site
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 px-3 w-full ">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
