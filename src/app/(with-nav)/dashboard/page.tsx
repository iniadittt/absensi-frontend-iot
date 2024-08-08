import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getDashboard } from "@/lib/action/crud";
import InternalServerError from "@/app/500";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const dashboardData = await getDashboard(session!.user.accessToken);
  if (!dashboardData || dashboardData.status !== 200) return <InternalServerError />;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col rounded-md border bg-card p-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col space-y-1.5 text-center lg:text-start">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Jumlah Dosen
              </h3>
            </div>
            <p className="text-center text-5xl font-bold lg:text-end">
              {dashboardData.data.dosen}
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-md border bg-card p-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col space-y-1.5 text-center lg:text-start">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Jumlah Presensi Hari ini
              </h3>
            </div>
            <p className="text-center text-5xl font-bold lg:text-end">
              {dashboardData.data.presensi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
