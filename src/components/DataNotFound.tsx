"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DataNotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-2xl text-gray-500">
          Oops, the data you were looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );
};

export default DataNotFound;
