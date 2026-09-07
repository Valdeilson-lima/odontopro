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
import { LoaderCircle, LogIn, Menu, UserRound, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { loginWithGitHub } from "../_actions/login";

export default function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [{ href: "#profissionais", label: "Profissionais" }];

  async function handleLogin() {
    await loginWithGitHub("github");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          onClick={() => setIsOpen(false)}
          variant="ghost"
          className="font-medium text-slate-600 hover:bg-[#e7f2ed] hover:text-[#17624f]"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <Link href={item.href}>{item.label}</Link>
          </div>
        </Button>
      ))}

      {status === "loading" ? (
        <Button
          variant="ghost"
          className="text-slate-500 hover:bg-transparent"
          disabled
        >
          <LoaderCircle className="h-4 w-4 animate-spin" />
        </Button>
      ) : session ? (
        <Button
          variant="ghost"
          className="font-medium text-slate-600 hover:bg-[#e7f2ed] hover:text-[#17624f]"
        >
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <Link href="/dashboard">{session.user?.name}</Link>
          </div>
        </Button>
      ) : (
        <Button
          variant="outline"
          className="border-[#b9d9ca] bg-white font-semibold text-[#17624f] hover:bg-[#e7f2ed] hover:text-[#104b3d]"
          onClick={handleLogin}
        >
          <div className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </div>
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-999 w-full border-b border-[#d9e8e1]/80 bg-[#f4f8f6]/90 px-5 py-3 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-[-0.04em] text-[#12352e] md:text-2xl">
            Odonto<span className="text-[#e77d52]">Pro</span>
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
                className="text-[#12352e] hover:bg-[#e7f2ed]"
                variant={"ghost"}
                size={"icon"}
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="z-9999 w-60 items-start bg-[#f4f8f6] text-[#12352e] sm:w-75"
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
