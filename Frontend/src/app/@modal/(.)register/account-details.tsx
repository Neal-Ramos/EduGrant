import SpotlightBorderWrapper from "@/components/ui/border";
import { UseFormRegister, FieldErrors, Control } from "react-hook-form";

import account from "@/assets/undraw_personal-file_81l0.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { registerData } from "./data-types";
import { Eye, EyeClosed, UserRoundPen } from "lucide-react";
import { useState } from "react";

type Props = {
  register: UseFormRegister<registerData>;
  errors: FieldErrors<registerData>;
  control: Control<registerData>;
};
export default function AccountDetails({ register, errors }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="grid grid-cols-2 gap-5"
    >
      <div className=" flex justify-center">
        <img className=" w-[90%] object-contain" src={account.src} alt="" />
      </div>

      <div className="grid grid-cols-1 gap-y-7 px-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            <UserRoundPen />
            Account Information
          </h1>
          <p className="text-muted-foreground mt-1">
            Set up your login credentials and account details.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentId">Student ID</Label>
            {errors.studentId && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentId.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <Input
              {...register("studentId", {
                required: "Required",
              })}
              id="studentId"
              placeholder="@example"
              type="number"
              className={errors.studentId ? `border border-red-500` : ""}
            />
          </SpotlightBorderWrapper>
        </div>
        <div className="space-y-2 ">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentEmail">Email</Label>
            {errors.studentEmail && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentEmail.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <Input
              {...register("studentEmail", {
                required: "Required",
              })}
              id="studentEmail"
              placeholder="Enter your email"
              type="email"
              className={errors.studentEmail ? `border border-red-500` : ""}
            />
          </SpotlightBorderWrapper>
        </div>
        <div className="space-y-2 ">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentContact">Contact number</Label>
            {errors.studentContact && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentContact.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <Input
              {...register("studentContact", {
                required: "Required",
              })}
              id="studentContact"
              placeholder="Enter your contact number"
              type="number"
              className={errors.studentContact ? `border border-red-500` : ""}
            />
          </SpotlightBorderWrapper>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentPassword">Password</Label>
            {errors.studentPassword && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentPassword.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <div className="relative flex items-center">
              <Input
                {...register("studentPassword", {
                  required: "Required",
                })}
                type={isVisible ? "text" : "password"}
                id="studentPassword"
                placeholder="Enter your password"
                className={
                  errors.studentPassword ? `border border-red-500` : ""
                }
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
          </SpotlightBorderWrapper>
        </div>
      </div>
    </motion.div>
  );
}
