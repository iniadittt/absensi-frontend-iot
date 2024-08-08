import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PresensiTable from "@/components/presensi/presensi-table";
import { Metadata } from "next";
import { getPresensi } from "@/lib/action/crud";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Search from "@/components/ui/search";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import InternalServerError from "@/app/500";

export const metadata: Metadata = {
  title: "Presensi",
};

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  const search = searchParams?.search || "";
  const presensiData = await getPresensi({
    accessToken: session!.user.accessToken,
    search,
  }) || [];
  if (!presensiData) return <InternalServerError />;
  const presensi = presensiData.status === 200 ? presensiData.data.presensi : []

  return (
    <main className="grid flex-1 items-start gap-6 sm:py-0">
      <div className="flex flex-row justify-between gap-6">
        <Search placeholder="Cari presensi berdasarkan nama dosen..." />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Presensi</CardTitle>
          <CardDescription>Lihat data presensi dosen.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense key={search} fallback={<TableSkeleton colSpan={5} />}>
            <PresensiTable presensi={presensi} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
