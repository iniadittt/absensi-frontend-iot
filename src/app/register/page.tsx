import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import { authOptions } from "@/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 px-4 py-8 md:gap-8 lg:py-24 xl:gap-12">
      <div className="flex flex-col gap-2 xl:gap-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter email and password to register a new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
        <Button variant={"link"} asChild>
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
