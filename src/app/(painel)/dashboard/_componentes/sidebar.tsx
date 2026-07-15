"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Link from "next/link";
import Image from "next/image";
import img from "../../../../../public/logo-odonto.png";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  console.log("Current pathname:", pathname);
  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-2 flex items-center justify-center">
          {!isCollapsed && (
            <Image src={img} alt="Logo OdontoPró" priority quality={100} />
          )}
        </div>

        <Button
          className="bg-gray-300 hover:bg-gray-200 text-zinc-900 self-end cursor-pointer flex align-center justify-center rounded-md p-3  transition-all duration-300"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        {isCollapsed && (
          <div className="flex flex-col items-center gap-2 mt-5">
            <SidebarLink
              href="/dashboard"
              icon={<CalendarCheck className="h-5 w-5" />}
              label="Agendamentos"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/services"
              icon={<Folder className="h-5 w-5" />}
              label="Serviços"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/profile"
              icon={<Settings className="h-5 w-5" />}
              label="Meu Perfil"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/plans"
              icon={<Banknote className="h-5 w-5" />}
              label="Meus Planos"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </div>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-2 overflow-hidden text-sm pt-5">
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Painel
              </span>
              <SidebarLink
                href="/dashboard"
                icon={<CalendarCheck className="h-5 w-5" />}
                label="Agendamentos"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />

              <SidebarLink
                href="/dashboard/services"
                icon={<Folder className="h-5 w-5" />}
                label="Serviços"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                Configurações
              </span>

              <SidebarLink
                href="/dashboard/profile"
                icon={<Settings className="h-5 w-5" />}
                label="Meu Perfil"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />

              <SidebarLink
                href="/dashboard/plans"
                icon={<Banknote className="h-5 w-5" />}
                label="Meus Planos"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="flex items-center justify-between bg-white px-4 py-2 shadow-md md:px-6 md:hidden z-10 sticky top-0">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden cursor-pointer"
                >
                  <List className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold leading-7 text-gray-900">
                Menu OdontoPró
              </h1>
            </div>

            <SheetContent side="right" className="sm:max-w-xs text-black">
              <SheetHeader>
                <SheetTitle>Menu OdontoPró</SheetTitle>
                <SheetDescription>
                  Selecione uma opção do menu.
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-2 text-base pt-5 ml-5 mr-5">
                <SidebarLink
                  href="/dashboard"
                  icon={<CalendarCheck className="h-6 w-6" />}
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />

                <SidebarLink
                  href="/dashboard/services"
                  icon={<Folder className="h-6 w-6" />}
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />

                <SidebarLink
                  href="/dashboard/profile"
                  icon={<Settings className="h-6 w-6" />}
                  label="Meu Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />

                <SidebarLink
                  href="/dashboard/plans"
                  icon={<Banknote className="h-6 w-6" />}
                  label="Meus Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: SidebarLinkProps) {
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-200",
          {
            "text-white bg-blue-500 hover:bg-blue-400": isActive,
            "justify-center": isCollapsed,
          }
        )}
      >
        <span className="h-6 w-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
