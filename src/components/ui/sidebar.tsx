"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinksItem from "@/components/ui/links";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-48 flex-col border-r bg-background sm:flex">
        <div className="flex flex-col border-b py-2">
          <h1 className="flex h-10 items-center justify-center text-xl font-bold">
            Absensi
          </h1>
        </div>
        <nav className="flex flex-col items-start gap-1 px-2 sm:py-4">
          {LinksItem.map((link, index) => {
            const Icon = link.icon;
            const isActive =
              link.path === "/dashboard" && pathname === "/dashboard"
                ? true
                : link.path !== "/dashboard" && pathname.startsWith(link.path);
            return (
              <Link
                key={index}
                href={link.path}
                className={`flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in hover:rounded-lg hover:bg-accent hover:text-primary ${
                  isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                }`}
              >
                <Icon className="mr-4 h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
