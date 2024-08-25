"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dataBulan = [
  { nomor: 1, nama: "Januari" },
  { nomor: 2, nama: "Februari" },
  { nomor: 3, nama: "Maret" },
  { nomor: 4, nama: "April" },
  { nomor: 5, nama: "Mei" },
  { nomor: 6, nama: "Juni" },
  { nomor: 7, nama: "Juli" },
  { nomor: 8, nama: "Agustus" },
  { nomor: 9, nama: "September" },
  { nomor: 10, nama: "Oktober" },
  { nomor: 11, nama: "November" },
  { nomor: 12, nama: "Desember" },
];
const dataTahun: number[] = [];
const tahunSekarang = new Date().getFullYear();
const bulanSekarang = new Date().getMonth() + 1;

for (let i = tahunSekarang; i >= tahunSekarang - 5; i--) {
  dataTahun.push(i);
}

export default function Download({ accessToken }: { accessToken: any }) {
  const [tahun, setTahun] = useState<number>(tahunSekarang);
  const [bulan, setBulan] = useState<number>(bulanSekarang);
  const [url, setUrl] = useState<string>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${tahun}/${bulan}/download`);
  
  useEffect(() => {
      setUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${tahun}/${bulan}/download`);
  }, [tahun, bulan])

  return (
    <div className="flex justify-end gap-2">
      <Select
        value={bulan.toString()}
        onValueChange={(value) => setBulan(Number(value))}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Pilih Bulan" />
        </SelectTrigger>
        <SelectContent>
          {dataBulan.map((month) => (
            <SelectItem key={month.nomor} value={month.nomor.toString()}>
              {month.nama}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={tahun.toString()}
        onValueChange={(value) => setTahun(Number(value))}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Pilih Tahun" />
        </SelectTrigger>
        <SelectContent>
          {dataTahun.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="default" asChild>
        <Link
          href={url}
        >
          Download Pdf
        </Link>
      </Button>
    </div>
  );
}
