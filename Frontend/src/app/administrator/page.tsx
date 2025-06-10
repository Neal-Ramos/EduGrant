"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import BlurText from "@/components/ui/blur";

type FormData = {
  username: string;
  password: string;
  remember?: boolean;
  code?: string;
};

export default function Admin() {
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (!showVerification) {
      // Simulate sending code to email
      setShowVerification(true);
    } else {
      alert(JSON.stringify(data, null, 2));
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-popover">
      {/* Branding */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[rgba(30,175,115,0.3)] via-[rgba(30,175,115,0.15)] to-transparent p-12">
        <div className="text-left space-y-4 max-w-md">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Edugrant Admin
          </h1>
          <span className="text-lg /80">
            <BlurText
              text="Manage everything in one place. Secure. Efficient. Reliable."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg"
        >
          <div>
            <h2 className="text-3xl font-semibold">Sign in to your account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use your admin credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mt-13">
            {!showVerification ? (
              <>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="admin@example.com"
                    className="h-11 bg-[#1a1d24] border border-[rgba(30,175,115,0.3)] placeholder-gray-500"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 border border-[rgba(30,175,115,0.3)] placeholder-gray-500"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      className="bg-[#1a1d24] border-[rgba(30,175,115,0.3)]"
                      {...register("remember")}
                    />
                    Remember me
                  </label>
                  <a href="#" className="hover:underline">
                    Forgot password?
                  </a>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  placeholder="Enter the 6-digit code sent to your email"
                  className="h-11 border border-[rgba(30,175,115,0.3)] placeholder-gray-500"
                  {...register("code", {
                    required: "Verification code is required",
                    minLength: {
                      value: 6,
                      message: "Code must be 6 digits",
                    },
                  })}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">{errors.code.message}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="h-11 w-full bg-[rgba(30,175,115,0.9)] hover:bg-[rgba(30,175,115,1)] transition-colors font-medium rounded-lg"
            >
              {showVerification ? "Verify Code" : "Login"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
