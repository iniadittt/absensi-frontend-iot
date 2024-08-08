import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />
      <div className="sm:pl-48">
        <Navbar />
        <div className="p-4 sm:p-6">{children}</div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Layout;
