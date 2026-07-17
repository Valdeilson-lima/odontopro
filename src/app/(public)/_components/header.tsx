"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader, LogIn, Menu } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [{ name: "Profissionais", href: "/(public)/profissionais" }];

  async function handleRegisterClick() {
    await handleRegister("GitHub");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          variant="ghost"
          asChild
          className="text-[#1A2E35] hover:text-[#C4956A] hover:bg-transparent bg-transparent shadow-none px-0 py-0 h-auto font-normal text-base"
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}

      {status === "loading" ? (
        <>
          <Loader className="animate-spin h-4 w-4 text-[#1A2E35]" />
        </>
      ) : session ? (
        <Button
          variant="ghost"
          asChild
          className="bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2 h-auto text-sm shadow-none rounded-xl font-bold transition-all duration-300 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Link href="/dashboard">Acessar o Painel</Link>
        </Button>
      ) : (
        <Button
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2 h-auto text-sm shadow-none rounded-xl font-bold transition-all duration-300 cursor-pointer"
          onClick={handleRegisterClick}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Portal da Clinica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm border-b border-[#F0EDE8] z-99 py-5 px-6">
      <div className="container mx-auto flex items-center justify-between ">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A2E35] tracking-tight">
            Odonto<span className="text-emerald-500">Pro</span>
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              className="p-2 cursor-pointer border-[#F0EDE8] text-[#1A2E35]"
              size={"icon"}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-65 sm:w-75 z-999 p-6">
            <SheetHeader className="pb-4 mb-4 border-b border-[#F0EDE8]">
              <SheetTitle className="text-[#1A2E35]">Menu</SheetTitle>
              <SheetDescription>
                Veja as opções do menu abaixo.
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
