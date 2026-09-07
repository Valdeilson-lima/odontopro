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
  History,
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
          "flex min-h-screen flex-col border-r border-[#dce8e3] bg-[#f7fbf9] p-3 transition-all duration-300",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-8 mt-2">
          <Link href="/" className="flex items-center justify-center">
            {!isCollapsed && (
              <Image
                src={logoImage}
                alt="OdontoPro"
                quality={100}
                className="h-auto w-40"
              />
            )}
          </Link>
        </div>

        <Button
          className="mb-5 self-end rounded-lg border border-[#b9d9ca] bg-white px-3 text-[#17624f] shadow-sm hover:bg-[#e7f2ed] hover:text-[#104b3d]"
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
              href="/dashboard/historico"
              label="Histórico"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<History className="w-6 h-6" />}
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
              <span className="mb-2 mt-1 px-3 text-[11px] font-semibold tracking-[0.08em] text-[#789087]">
                Painel
              </span>
              <div className="flex flex-col gap-1">
                <SidebarLinks
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Calendar className="w-6 h-6" />}
                />
                <SidebarLinks
                  href="/dashboard/historico"
                  label="Histórico"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<History className="w-6 h-6" />}
                />
                <SidebarLinks
                  href="/dashboard/services"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder className="w-6 h-6" />}
                />
              </div>
              <span className="mb-2 mt-7 px-3 text-[11px] font-semibold tracking-[0.08em] text-[#789087]">
                Configurações
              </span>
              <div className="flex flex-col gap-1">
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
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dce8e3] bg-[#f7fbf9]/95 p-4 backdrop-blur-md md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <div className="flex items-center gap-4">
              <SheetTrigger
                render={
                  <Button className="" variant="outline" size={"icon"}>
                    <List className="w-6 h-6" />
                  </Button>
                }
              ></SheetTrigger>
              <h1 className="text-lg font-semibold tracking-[-0.03em] text-[#12352e]">
                Menu Odonto<span className="text-[#e77d52]">Pro</span>
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
                    href="/dashboard/historico"
                    label="Histórico"
                    pathname={pathname}
                    isCollapsed={false}
                    icon={<History className="w-6 h-6" />}
                    onClick={() => setSheetOpen(false)}
                  />
                </nav>

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

        <main className="min-w-0 flex-1 bg-[#f4f8f6] px-3 py-4 sm:px-5 md:p-8">
          {children}
        </main>
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
          "group mx-1 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 md:mx-0",
          {
            "bg-[#17624f] text-white shadow-[0_8px_18px_-12px_#17624f]":
              pathname === href,
            "text-[#607770] hover:bg-[#e7f2ed] hover:text-[#17624f]":
              pathname !== href,
          }
        )}
      >
        <span className="flex h-6 w-6 items-center justify-center">{icon}</span>
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
    </Link>
  );
}
