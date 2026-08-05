"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoImage from "../../../../../public/logo-odonto.png";

export default function SidebarDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r border-gray-200 bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">
          {!isCollapsed && <Image src={logoImage} alt="Logo" quality={100} />}
        </div>

        <Button
          className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 text-center rounded-md flex items-center justify-center mb-2 self-end cursor-pointer"
          title="Alternar Sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight />
          )}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-3 overflow-hidden mt-5">
            <SidebarLinks
              href="/dashboard"
              label="Agendamentos"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<Calendar className="w-6 h-6" />}
            />
            <SidebarLinks
              href="/dashboard/services"
              label="Serviços"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<Folder className="w-6 h-6" />}
            />
            <SidebarLinks
              href="/dashboard/profile"
              label="Perfil"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<Settings className="w-6 h-6" />}
            />
            <SidebarLinks
              href="/dashboard/plans"
              label="Planos"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<DollarSign className="w-6 h-6" />}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed} className="flex flex-col gap-2">
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-500 font-medium mt-2 mb-3 uppercase">
                Painel
              </span>
              <div className="flex flex-col gap-4">
                <SidebarLinks
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Calendar className="w-6 h-6" />}
                />
                <SidebarLinks
                  href="/dashboard/services"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder className="w-6 h-6" />}
                />
              </div>
              <span className="text-sm text-gray-500 font-medium mt-2 mb-3 uppercase">
                Configurações
              </span>
              <div className="flex flex-col gap-4">
                <SidebarLinks
                  href="/dashboard/profile"
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Settings className="w-6 h-6" />}
                />
                <SidebarLinks
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<DollarSign className="w-6 h-6" />}
                />
              </div>
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
        <header className="md:hidden flex items-center justify-between bg-white p-4 shadow-md z-10 sticky top-0">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <div className="flex items-center gap-4">
              <SheetTrigger
                render={
                  <Button className="" variant="outline" size={"icon"}>
                    <List className="w-6 h-6" />
                  </Button>
                }
              ></SheetTrigger>
              <h1 className="text-xl font-bold">
                Menu Odonto<span className="text-emerald-500">Pró</span>
              </h1>
            </div>

            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">
                  Odonto<span className="text-emerald-500">Pró</span>
                </SheetTitle>
                <SheetDescription>Menu Administrativo</SheetDescription>
              </SheetHeader>
              <nav className="grid test-base pt-2">
                <SidebarLinks
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={false}
                  icon={<Calendar className="w-6 h-6" />}
                  onClick={() => setSheetOpen(false)}
                />

                <nav className="grid gap-2 test-base pt-5">
                  <SidebarLinks
                    href="/dashboard/services"
                    label="Serviços"
                    pathname={pathname}
                    isCollapsed={false}
                    icon={<Folder className="w-6 h-6" />}
                    onClick={() => setSheetOpen(false)}
                  />
                </nav>

                <nav className="grid gap-2 test-base pt-5">
                  <SidebarLinks
                    href="/dashboard/profile"
                    label="Perfil"
                    pathname={pathname}
                    isCollapsed={false}
                    icon={<Settings className="w-6 h-6" />}
                    onClick={() => setSheetOpen(false)}
                  />
                </nav>

                <nav className="grid gap-2 test-base pt-5">
                  <SidebarLinks
                    href="/dashboard/plans"
                    label="Planos"
                    pathname={pathname}
                    isCollapsed={false}
                    icon={<DollarSign className="w-6 h-6" />}
                    onClick={() => setSheetOpen(false)}
                  />
                </nav>
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
  pathname: string | null;
  isCollapsed: boolean;
  onClick?: () => void;
}

function SidebarLinks({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 mx-4 md:mx-0",
          {
            "text-white bg-emerald-500": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
    </Link>
  );
}
