"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const InternalServerError = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <Image src="/umsu.png" alt="Logo" width={100} height={100} />
      <h1 className="text-8xl font-bold tracking-tighter sm:text-9xl">500</h1>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Oops, the page you are looking for does not exist.
        </h2>
        <p className="text-gray-500">
          The page you requested could not be found. Please check the URL or try
          again later.
        </p>
      </div>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
};

export default InternalServerError;
