import React from "react";
import AddUserForm from "@/components/users/add-form";
import { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "Add Users",
};

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <AddUserForm />
    </SessionProvider>
  );
};

export default Page;
