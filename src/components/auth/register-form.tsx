"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterFormSchema } from "@/lib/form/authentication-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState("");
  const [password, setPassword] = React.useState(true);

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function register(values: z.infer<typeof RegisterFormSchema>) {
    setIsLoading(true);
    setIsInvalid("");
    // try {
    //   const res = await signIn("credentials", {
    //     email: values.email,
    //     password: values.password,
    //     redirect: false,
    //     callBackUrl,
    //   });

    //   if (res?.error) {
    //     setIsInvalid(res.error);
    //     setIsLoading(false);
    //     return;
    //   }

    //   router.push(callBackUrl);
    //   router.refresh();
    //   return;
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error("An error occurred", error);
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(register)} className="space-y-4">
        {isInvalid && (
          <div className="flex flex-row items-center rounded-md border border-destructive bg-destructive/5 p-4 text-destructive">
            {/* <ExclamationTriangleIcon className="mr-2 h-5 w-5" /> */}
            <p className="text-sm font-medium">{isInvalid}</p>
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input id="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center justify-center">
                  <Input
                    type={password ? "password" : "text"}
                    placeholder={password ? "••••••••" : "password"}
                    {...field}
                    className="flex items-center"
                    id="password"
                  />
                  {password ? (
                    <Eye
                      size={18}
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setPassword(!password)}
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setPassword(!password)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
        <div className="flex flex-col items-center justify-center">
          <p>Already have account?</p>
          <Button variant={"link"} asChild>
            <Link href="/login">Login here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
