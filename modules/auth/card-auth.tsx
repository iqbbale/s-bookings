"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { login, type loginSchema } from "@/lib/validations/login";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { useToast } from "@/hooks/toast";
import { submitLogin } from "@/app/(auth)/login/actions";

export function CardLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginSchema>({
    resolver: zodResolver(login),
  });

  const { message, showToast } = useToast();

  const onSubmit = async (data: loginSchema) => {
    const result = await submitLogin(data);

    if (!result.success) {
      showToast(result.message ?? "SUCCESS");
      reset();
    } else {
      showToast(result.message ?? "Email Or Password Wrong");
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login To Your Account</CardTitle>
        <CardDescription>
          Enter Your Email And Password Bellow To Your Account
        </CardDescription>
        <CardAction>
          <Button variant="link" className="cursor-pointer">
            Sign Up for Free
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                {...register("email")}
                placeholder="email"
              />
              {/* email */}
              {errors.email && (
                <p role="alert" className="ml-3 mb-2 text-red-600 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              {/* password */}
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={"/forgots"}
                  className="ml-auto inline-block text-sm underline-offset-4"
                >
                  Forgot your password
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="password"
              />
              {errors.password && (
                <p role="alert" className="ml-3 mb-2 text-red-600 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            {message && (
              <div className="p-3 bg-green-100 text-green-800 rounded mb-4 max-w-fulls">
                {message}
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          variant="outline"
        >
          Sign In To SportsHub
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Continue With Google <FaGoogle />
        </Button>
      </CardFooter>
    </Card>
  );
}
