import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TableKehadiran({
  absensiData,
  title,
  message = "Data tidak ada",
  isAlpha = false,
}: {
  absensiData: any;
  title: string;
  message?: string;
  isAlpha?: boolean;
}) {
  return (
    <Card className="h-min">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          {absensiData.length > 0 ? (
            <>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  {isAlpha ? (
                    ""
                  ) : absensiData.length > 0 ? (
                    <TableHead>Waktu</TableHead>
                  ) : (
                    ""
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {absensiData.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    {item.time !== null ? (
                      <TableCell>
                        {` ${String(new Date(item.time).getUTCHours()).padStart(2, "0")}:${String(new Date(item.time).getUTCMinutes()).padStart(2, "0")}:${String(new Date(item.time).getUTCSeconds()).padStart(2, "0")}`}{" "}
                        WIB
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </>
          ) : (
            <TableHeader>
              <TableRow>
                <TableHead>{message}</TableHead>
              </TableRow>
            </TableHeader>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
