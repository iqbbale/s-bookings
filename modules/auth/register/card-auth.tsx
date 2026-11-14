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
import { registration, type registerSchema } from "@/lib/validations/register";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/toast";
import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { submitRegister } from "@/app/(auth)/register/actions";

export function CardRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerSchema>({
    resolver: zodResolver(registration),
  });

  const { message, showToast } = useToast();

  const onSubmit = async (data: registerSchema) => {
    const result = await submitRegister(data);

    if (result.success) {
      showToast(result.message ?? "Register Success");
      reset();
    } else {
      showToast(result.message ?? "Email Or Password Wrong");
    }
  };

  // Eye
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>REGISTRATION</CardTitle>
        <CardDescription>
          Enter Your Email And Password Bellow To Registration
        </CardDescription>
        <CardAction>
          <Button variant="link" className="cursor-pointer">
            <Link
              href={"/login"}
              className="ml-auto inline-block text-sm underline-offset-4 "
            >
              Sign in
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="registerForm">
          <div className="flex flex-col gap-6">
            {/* email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="text"
                  autoComplete="off"
                  required
                  {...register("email")}
                  placeholder="blublub@gmail.com"
                  className="pl-9"
                />
              </div>
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
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  autoComplete="off"
                  {...register("passwordHash")}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.passwordHash && (
                <p role="alert" className="ml-3 mb-2 text-red-600 text-sm mt-1">
                  {errors.passwordHash?.message}
                </p>
              )}
            </div>
            {/* confirmasi password */}
            <div className="grid gap-2">
              <Label htmlFor="confirm password">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirm password"
                  type={showConfirmPassword ? "password" : "text"}
                  autoComplete="off"
                  {...register("confirmPassword")}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="ml-3 mb-2 text-red-600 text-sm mt-1">
                  {errors.confirmPassword?.message}
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
          className="w-full cursor-pointer bg-[#10B981]"
          variant="outline"
          form="registerForm"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
