"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-sucess";
import { login } from "@/actions/login";

export const ResisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSucess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSucess(data.sucess);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={sucess}></FormSuccess>
          <div>
            <Button type="submit" className="w-full">
              LogIn
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
