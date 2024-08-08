"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, PanelLeftIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import LinksItem from "@/components/ui/links";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background py-2">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
        <div className="flex w-full flex-row justify-between sm:justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeftIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-2 sm:max-w-xs">
              <nav className="grid gap-2 text-lg font-medium">
                <p className="p-1 text-lg font-bold">Library</p>
                {LinksItem.map((link, index) => {
                  const Icon = link.icon;

                  const isActive =
                    link.path === "/dashboard" && pathname === "/dashboard"
                      ? true
                      : link.path !== "/dashboard" &&
                        pathname.startsWith(link.path);

                  return (
                    <Link
                      key={index}
                      href={link.path}
                      className={`flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in hover:rounded-lg hover:bg-accent hover:text-primary ${isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"}`}
                    >
                      <Icon className="mr-4 h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-row items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="overflow-hidden rounded-full"
                  size="icon"
                >
                  <Avatar>
                    <AvatarImage src="/umsu.png" />
                    <AvatarFallback>FI</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-destructive hover:cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOutIcon className="mr-2" size={16} />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
