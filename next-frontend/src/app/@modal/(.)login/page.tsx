"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Eye,
  EyeClosed,
  IdCard,
  KeyRound,
  LogInIcon,
  Send,
  UserRoundPlus,
  X,
} from "lucide-react";
import Link from "next/link";

export default function LoginClient() {
  type LoginDetails = {
    id: string;
    password: string;
    remember: boolean;
    verificationCode: string;
  };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginDetails>({
    defaultValues: {
      id: "",
      password: "",
      remember: false,
      verificationCode: "",
    },
  });
  const onSubmit = (data: LoginDetails) => {
    if (data.remember) {
      localStorage.setItem("rememberedId", data.id);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberedId");
      localStorage.removeItem("rememberMe");
    }
    alert(JSON.stringify(data, null, 2));
  };
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        router.back();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [open, router]);
  useEffect(() => {
    const rememberedId = localStorage.getItem("rememberedId");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberedId) {
      setValue("id", rememberedId);
    }
    setValue("remember", rememberMe);
  }, [setValue]);
  const [isVisible, setIsVisible] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [resendVisible, setResendVisible] = useState(false);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendVisible(true);
    }
  }, [seconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResend = () => {
    // TODO: trigger actual resend code logic here
    setSeconds(120);
    setResendVisible(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-3/4 mx-auto bg-background h-screen">
        <DrawerHeader>
          <div className="sr-only">
            <DrawerTitle className="text-2xl tracking-[-3px] zxczxc text-center">
              Login
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Enter your credentials to access your account.
            </DrawerDescription>
          </div>
        </DrawerHeader>
        {currentStep === 1 && (
          <div className=" px-10">
            <div>
              <h1 className="text-2xl mt-10 zxczxc tracking-[-3px]">Login</h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your account.
              </p>
              <div className="space-y-7 mt-7">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      Student ID
                      <IdCard className="h-5" />
                    </Label>
                    {errors.id && (
                      <p className="text-sm text-red-500">
                        {errors.id.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register("id", {
                      required: "Required",
                    })}
                    placeholder="2022********"
                    className={errors.id ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      Password
                      <KeyRound className="h-4" />
                    </Label>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="relative flex items-center">
                    <Input
                      {...register("password", {
                        required: "Required",
                      })}
                      type={isVisible ? "text" : "password"}
                      id="studentPassword"
                      placeholder="Enter your password"
                      className={errors.password ? `border-red-500` : ""}
                    />
                    <div
                      className="absolute right-5 cursor-pointer"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeClosed className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="flex gap-2 items-start">
                    <Controller
                      control={control}
                      name="remember"
                      render={({ field: { value, onChange } }) => (
                        <span className="flex gap-2 items-start">
                          <Checkbox
                            id="remember"
                            checked={value}
                            onCheckedChange={onChange}
                          />
                          <Label htmlFor="remember">Remember me</Label>
                        </span>
                      )}
                    />
                  </span>
                  <span>
                    <Label className="underline">
                      <Dialog>
                        <DialogTrigger>Forgot password?</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reset your password</DialogTitle>
                            <DialogDescription>
                              Enter your email to receive password reset
                              instructions.
                            </DialogDescription>
                            <div className="flex items-center gap-2 mt-3">
                              <Input />
                              <Button>
                                <Send />
                              </Button>
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </Label>
                  </span>
                </div>
                <div className="mt-10 text-center space-y-3">
                  <div className="text-xs text-gray-600">
                    By signing in, you agree to our{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="underline text-blue-600"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="underline text-blue-600"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </div>
                  <Button
                    onClick={
                      currentStep === 1
                        ? handleSubmit(() => {
                            setCurrentStep((prev) => prev + 1);
                          })
                        : () => setCurrentStep((prev) => prev + 1)
                    }
                    className="w-full"
                  >
                    Submit
                    <LogInIcon />
                  </Button>
                  <div className="relative w-full flex justify-center items-center py-5">
                    <div className="border w-full"></div>
                    <Label className="absolute z-10 bg-background px-3 text-muted-foreground">
                      {" "}
                      Don't have an account?
                    </Label>
                  </div>
                  <Link
                    href={"/register"}
                    prefetch={true}
                    scroll={false}
                    className="underline"
                  >
                    <Button variant="outline" className="w-full ">
                      Register
                      <UserRoundPlus />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-10 p-10">
            <div>
              <h1 className="text-2xl mt-10 zxczxc tracking-[-3px]">
                Verification
              </h1>
              <p className="text-muted-foreground">
                A verification link has been sent to your email. Please check
                your inbox.
              </p>
            </div>
            <div className=" flex justify-center items-center flex-col gap-3">
              <Controller
                name="verificationCode"
                control={control}
                rules={{
                  required: "Verification code is required",
                  minLength: { value: 6, message: "Code must be 6 digits" },
                  maxLength: { value: 6, message: "Code must be 6 digits" },
                  // pattern: {
                  //   value: /^\d+$/,
                  //   message: "Only numbers allowed",
                  // },
                }}
                render={({ field }) => (
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      {[0, 1, 2].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={
                            errors.verificationCode ? "border-red-500" : ""
                          }
                        />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {[3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={
                            errors.verificationCode ? "border-red-500" : ""
                          }
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {errors.verificationCode && (
                <p className="text-sm text-red-500">
                  {errors.verificationCode.message}
                </p>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {!resendVisible ? (
                <>
                  Didn't get the code? Resend in{" "}
                  <span className="font-semibold">{formatTime(seconds)}</span>
                </>
              ) : (
                <>
                  Didn't get the code?{" "}
                  <button
                    onClick={handleResend}
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    Resend Code
                  </button>
                </>
              )}
            </p>
            <Button className="w-full" onClick={handleSubmit(onSubmit)}>
              Login <LogInIcon />
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
