import { useEffect, useState } from "react";
import verification from "@/assets/undraw_mail-sent_ujev.svg";
import { motion } from "framer-motion";
import { registerData } from "./data-types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  Controller,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<registerData>;
  errors: FieldErrors<registerData>;
  control: Control<registerData>;
};

export default function EmailVerification({
  register,
  errors,
  control,
}: Props) {
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
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="grid grid-cols-2 gap-5"
    >
      <div className="flex justify-center">
        <img
          className="w-[65%] object-contain"
          src={verification.src}
          alt="Email Verification"
        />
      </div>
      <div className="grid grid-cols-1 gap-7 px-4">
        <div>
          <h1 className="text-xl font-semibold">Email Verification</h1>
          <p className="text-muted-foreground">
            A verification link has been sent to your email. Please check your
            inbox.
          </p>
        </div>
        <div className="flex justify-center items-start">
          <Controller
            name="verificationCode"
            control={control}
            rules={{
              required: "Verification code is required",
              minLength: { value: 6, message: "Code must be 6 digits" },
              maxLength: { value: 6, message: "Code must be 6 digits" },
              // pattern: { value: /^\d+$/, message: "Only numbers allowed" },
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
        </div>

        {/* Timer / Resend link */}
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

        {/* Error message */}
        {errors.verificationCode && (
          <p className="text-red-500 text-sm text-center">
            {errors.verificationCode.message}
          </p>
        )}
      </div>
    </motion.div>
  );
}
