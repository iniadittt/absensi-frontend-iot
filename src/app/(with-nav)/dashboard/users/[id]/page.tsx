import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon } from "lucide-react";
import { getUser } from "@/lib/action/crud";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import DataNotFound from "@/components/DataNotFound";
import InternalServerError from "@/app/500";
import NotFound from "@/app/not-found";

export const metadata: Metadata = {
  title: "Users Detail",
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
    <>
      {user ? (
        <main className="grid flex-1 items-start gap-6 sm:py-0">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/users">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              User Details
            </h1>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label className="font-bold">Alamat Email</Label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <Label className="font-bold">NIDN</Label>
                      <p className="text-lg">{user.nidn}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Nama Lengkap</Label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Jenis Kelamin</Label>
                      <p className="text-lg">{user.jk}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Nomor Telepone</Label>
                      <p className="text-lg">{user.phone}</p>
                    </div>
                    <div>
                      <Label className="font-bold">Alamat</Label>
                      <p className="text-lg">{user.alamat}</p>
                    </div>
                    <div>
                      <Label className="font-bold">RFID</Label>
                      <p className="text-lg">{user.idRfid}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      ) : (
        <DataNotFound />
      )}
    </>
  );
};

export default Page;
