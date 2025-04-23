import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import bascLogo from "../assets/basclogo.png";
import bascImage from "../assets/BASCjf5989_03 copy.jpg";

import edugrantlogo from "@/assets/greenlogo.png";

import { Minus, Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function DrawerDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email";
      valid = false;
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form logic here
      console.log("Form submitted");
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="lg">Login</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Login Your Account</DrawerTitle>
            <DrawerDescription>
              Enter your credentials to access your account.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit}>
            <div className="p-4 flex gap-3 flex-col">
              <span className="flex gap-2 flex-col">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </span>
              <span className="flex gap-2 flex-col">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </span>
            </div>
            <DrawerFooter>
              <Button type="submit">Login</Button>
              <span className="relative text-center flex justify-center items-center mt-3">
                <p className="bg-white z-1 p-1 text-xs">OR CONTINUE WITH</p>
                <div className="absolute border-1 border-black/50 w-full"></div>
              </span>
              <Button className="mt-2" variant="outline">
                Google
              </Button>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function ClientLogin() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [bg, setBg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const handleSignInClick = () => {
    setShowOTP(true);
  };
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-start items-center bg-background rounded-xs gap-5">
        <header className="h-[70px] w-[95%]  mt-3 rounded-md flex justify-between items-center px-5">
          <span className="h-[90%] flex  justify-center items-center gap-2">
            <img
              className="h-full w-full object-contain"
              src={edugrantlogo}
              alt=""
            />
            <h1 className="zxc text-2xl tracking-[-2px] font-bold text-black/80">
              EDUGRANT
            </h1>
          </span>

          <nav>
            <ul className="flex justify-center items-center gap-15">
              <li className="font-semibold text-md">Home</li>
              <li className="font-semibold text-md">How it Works</li>
              <li className="font-semibold text-md">About</li>
              <li>
                <DrawerDemo />
              </li>
            </ul>
          </nav>
        </header>

        <div className="relative w-[95%] bg-green-800 h-[80%] rounded-4xl shadow-xl flex    overflow-hidden">
          <div className=" w-[60%] flex flex-col justify-center items-start z-10  text-white p-10">
            <h1 className="text-5xl font-bold">
              Scholarship Applications <br /> Made Easy
            </h1>
            <p className="mt-3 text-xl">
              Apply, track, and get notified — all in one place for BASC
              students.
            </p>
            <Button
              size="lg"
              className="ml-6  mt-10"
              onClick={() => {
                setOpenLogin(true), setBg(true);
              }}
            >
              Apply Now <ArrowRight />
            </Button>
          </div>
          <div className="absolute h-full opacity-10 -translate-x-20">
            <img className="h-full w-full" src={bascLogo} alt="" />
          </div>
          <div className="relative w-[40%] flex justify-end items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-transparent to-transparent z-10" />

            <img
              className="absolute bottom-0 h-full w-full drop-shadow-md object-cover object-[center_70%] z-0"
              src={bascImage}
              alt="bascImage"
            />
          </div>
        </div>
      </div>
    </>
  );
}
