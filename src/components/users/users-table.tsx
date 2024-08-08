import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SessionProvider from "@/components/SessionProvider";
import UsersAction from "./users-action";

const UsersTable = async ({ users }: { users: any }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alamat Email</TableHead>
            <TableHead>NIDN</TableHead>
            <TableHead>Nama Pengguna</TableHead>
            <TableHead className="hidden md:table-cell">
              Jenis Kelamin
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Nomor Telepone
            </TableHead>
            <TableHead className="hidden md:table-cell">Alamat</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="font-medium">{user.nidn}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.jk === "laki_laki" ? "Laki-laki" : "Perempuan"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.phone}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.alamat}
                </TableCell>
                <TableCell>
                  <SessionProvider session={session}>
                    <UsersAction userId={user.id} />
                  </SessionProvider>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <div className="flex h-64 w-full flex-col items-center justify-center">
                  No users found.
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
