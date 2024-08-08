"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { EditUserSchema } from "@/lib/form/users-form";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { updateUser } from "@/lib/action/crud";
import { toast } from "sonner";
import { LoadingSVG } from "@/components/iconSVG";

const EditUserForm = ({ user }: { user: any }) => {
  const { data: session, status } = useSession();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(user.jk);

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
  });

  async function onSubmit(values: z.infer<typeof EditUserSchema>) {
    setIsSubmit(true);
    try {
      if (status === "authenticated" && session) {
        toast("Submit data...", {
          icon: <LoadingSVG />,
          duration: Infinity,
          id: "submit-toast",
        });
        const data = { jk: selectedValue, ...values };
        const editUser = await updateUser(
          user.id,
          data,
          session!.user.accessToken,
        );

        if (editUser.status !== 200) {
          toast.dismiss("submit-toast");
          toast.error("Error", {
            description: (
              <p className="text-sm text-red-600">{editUser.message}</p>
            ),
            duration: 2000,
          });
          setIsSubmit(false);
          return;
        }

        toast.dismiss("submit-toast");
        toast.success("Success", {
          description: (
            <p className="text-sm text-green-700">{editUser.message}</p>
          ),
          duration: 2000,
        });
        setIsSubmit(false);
        return;
      }
    } catch (error) {
      console.error("An error occurred", error);
      setIsSubmit(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="grid flex-1 items-start gap-6 sm:py-0">
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/users">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Edit User Data
            </h1>
            <div className="flex items-center gap-2 md:ml-auto">
              <Button size="sm" type="submit" disabled={isSubmit}>
                Save Changes
              </Button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="email"
                        defaultValue={user.email}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email">Alamat Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="email@gmail.com"
                                id="email"
                                disabled={isSubmit}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="nidn"
                        defaultValue={user.nidn}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="nidn">
                              Nomor Induk Dosen Nasional (NIDN)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="xxxxxxxxxx"
                                id="nidn"
                                disabled={isSubmit}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="name"
                        defaultValue={user.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name">
                              Nama Lengkap Dosen
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nama Lengkap Dosen"
                                id="name"
                                disabled={isSubmit}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="jk"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="jk">Jenis Kelamin</FormLabel>
                            <Select
                              value={selectedValue}
                              onValueChange={(value) => {
                                setSelectedValue(value.toString() as string);
                                field.onChange(value);
                              }}
                              disabled={isSubmit}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Jenis Kelamin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="laki_laki">
                                  Laki-laki
                                </SelectItem>
                                <SelectItem value="perempuan">
                                  Perempuan
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="phone"
                        defaultValue={user.phone}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="phone">
                              Nomor Telepone
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="628xxxxxxxxxx"
                                id="phone"
                                disabled={isSubmit}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="idRfid"
                        defaultValue={user.idRfid}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="idRfid">RFID ID Card</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="xxxxxxxx"
                                id="idRfid"
                                disabled={isSubmit}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="alamat"
                        defaultValue={user.alamat}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="alamat">Alamat</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Alamat"
                                id="alamat"
                                disabled={isSubmit}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
};

export default EditUserForm;
