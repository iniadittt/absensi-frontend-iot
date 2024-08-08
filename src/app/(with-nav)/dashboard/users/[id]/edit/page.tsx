import React from "react";
import EditUserForm from "@/components/users/edit-form";
import { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/lib/action/crud";
import DataNotFound from "@/components/DataNotFound";
import InternalServerError from "@/app/500";
import NotFound from "@/app/not-found";

export const metadata: Metadata = {
  title: "Edit User",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const userId = Number(params.id);
  const fetchUser = await getUser({
    accessToken: session!.user.accessToken,
    id: userId,
  });
  const response = await fetchUser?.json();
  if (!response) return <InternalServerError />;
  const user: any = response?.data?.user || null;
  if (!user) return <NotFound />;

  return (
    <SessionProvider session={session}>
      {user ? <EditUserForm user={user} /> : <DataNotFound />}
    </SessionProvider>
  );
};

export default Page;
