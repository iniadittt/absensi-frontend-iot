import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { LogInIcon } from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { getAbsensi } from "@/lib/action/crud";
import Clock from "@/components/Clock";
import InternalServerError from "./500";
import Image from "next/image";
import TableKehadiran from "@/components/home/table-kehadiran";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const absensiData = await getAbsensi();
  if (!absensiData || absensiData.status !== 200) return <InternalServerError />;
  const { dosenHadir, dosenPulang, dosenTidakHadir } = absensiData.data;

  return (
    <div className="flex w-full flex-col items-center justify-center py-8 lg:h-screen">
      <div className="container h-full w-full space-y-4 px-4 md:px-6">
        <div className="flex justify-between">
          <Clock />
          <div className="flex flex-col items-end">
            {!!session && (
              <Button className="max-w-min" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
            {!session && (
              <Button className="max-w-min" asChild>
                <Link href="/login">
                  <LogInIcon className="mr-2" size={16} /> Login
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/umsu.png" alt="UMSU" width={150} height={150} />
        </div>
        <h1 className="text-center text-3xl font-bold uppercase tracking-tighter sm:text-5xl xl:text-6xl/none">
          Absensi Dosen FIKTI
        </h1>
        <p className="text-md text-center font-bold tracking-tighter sm:text-xl xl:text-2xl/none">
          Universitas Muhammadiyah Sumatera Utara
        </p>
        <div className="grid grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          <TableKehadiran title="Dosen Hadir" absensiData={dosenHadir} message="Belum ada dosen yang hadir hari ini"/>
          <TableKehadiran title="Dosen Pulang" absensiData={dosenPulang} message="Belum ada dosen yang pulang hari ini"/>
          <TableKehadiran
            title="Dosen Tidak Hadir"
            absensiData={dosenTidakHadir}
            message="Semua dosen sudah hadir hari ini"
            isAlpha={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
