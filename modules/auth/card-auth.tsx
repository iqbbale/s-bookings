"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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

    if (result.success) {
      showToast(result.message ?? "SUCCESS");
      reset();
    } else {
      showToast(result.message ?? "Email Or Password Wrong");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login To Your Account</CardTitle>
        <CardDescription>
          Enter Your Email And Password Bellow To Your Account
        </CardDescription>
        <CardAction>
          <Link
            href={"/register"}
            className={buttonVariants({
              variant: "link",
              className: "cursor-pointer",
            })}
          >
            Sign Up for Free
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
          <div className="flex flex-col gap-6">
            {/* email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                {...register("email")}
                placeholder="email"
              />
              {errors.email && (
                <p role="alert" className="ml-3 mb-2 text-red-600 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            {/* password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={"/forgots"}
                  className="ml-auto inline-block text-sm underline-offset-4"
                >
                  Forgot your password
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  {...register("password")}
                  placeholder="password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
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
          form="loginForm"
        >
          Sign In To SportsHub
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
        >
          Continue With Google <FaGoogle />
        </Button>
      </CardFooter>
    </Card>
  );
}
