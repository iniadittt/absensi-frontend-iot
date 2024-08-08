"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { AddUserSchema } from "@/lib/form/users-form";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { addUser } from "@/lib/action/crud";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSVG } from "@/components/iconSVG";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const AddUserForm = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState<string>("laki_laki");

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      email: "",
      nidn: "",
      name: "",
      jk: "laki_laki",
      phone: "",
      alamat: "",
      idRfid: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AddUserSchema>) {
    setIsSubmit(true);
    try {
      if (status === "authenticated" && session) {
        toast("Submit data...", {
          icon: <LoadingSVG />,
          duration: Infinity,
          id: "submit-toast",
        });

        const response = await addUser(
          {
            email: values.email,
            nidn: values.nidn,
            name: values.name,
            jk: values.jk,
            phone: values.phone,
            alamat: values.alamat,
            idRfid: values.idRfid,
          },
          session.user.accessToken,
        );

        if (response.status !== 200) {
          toast.dismiss("submit-toast");
          toast.error("Error", {
            description: (
              <p className="text-sm text-red-600">{response.message}</p>
            ),
            duration: 2000,
          });
          setIsSubmit(false);
          return;
        }

        toast.dismiss("submit-toast");
        toast.success("Success", {
          description: (
            <p className="text-sm text-green-700">{response.message}</p>
          ),
          duration: 2000,
        });

        router.push("/dashboard/users");

        form.reset();
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
              Add New User Data
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
                  <CardTitle>User Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="email"
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

export default AddUserForm;
