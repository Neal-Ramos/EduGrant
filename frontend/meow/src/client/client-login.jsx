import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from "lucide-react";
import logo from "@/assets/greenlogo.png";
import bascLogo from "../assets/basclogo.png";
import bascImage from "../assets/BASCjf5989_03 copy.jpg";
import img1 from "../assets/undraw_mobile-login_4ntr.svg";
import img2 from "../assets/undraw_absorbed-in_0b2u.svg";
import img3 from "../assets/undraw_upload_cucu.svg";
import img4 from "../assets/undraw_publish-article_u3z6.svg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
      <main className="w-full p-[1px] flex flex-col items-center justify-center gap-[1px]">
        <header className="fixed top-[10px]  w-[95%] h-[70px] rounded-[8px] flex justify-between items-center z-50 bg-background/30 backdrop-blur-[10px] px-3">
          <span className="flex justify-center items-center h-full gap-[5px] w-[200px]">
            <img className="h-[60%] w-[60%]" src={logo} alt="" />
            <p className="zxc text-2xl tracking-[-3px]">Edugrant.</p>
          </span>
          <nav className="flex gap-20 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="px-1 ">
                      <NavigationMenuLink
                        onClick={() => {
                          setOpenLogin(true), setBg(true);
                        }}
                      >
                        Login
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        onClick={() => {
                          setBg(true), setOpenRegister(true);
                        }}
                      >
                        Register
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <span className="text-sm">How it Works</span>
            <span className="text-sm">About</span>

            <span className="flex items-center gap-3">
              <Button
                className="bg-green-950"
                size="lg"
                onClick={() => {
                  setOpenLogin(true), setBg(true);
                }}
              >
                Login
              </Button>
            </span>
          </nav>
        </header>
        <AnimatePresence>
          {bg && (
            <motion.div
              className="fixed  bg-black/50 inset-0 flex items-center justify-center z-50 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AnimatePresence>
                {openLogin && (
                  <motion.div
                    className="relative shadow-xl px-10 py-12 rounded-2xl bg-background  w-[400px]"
                    initial={{ opacity: 0, translateY: -100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -100 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
                  >
                    <X
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={() => {
                        setBg(false),
                          setOpenLogin(false),
                          setOpenRegister(false);
                      }}
                    />
                    <h1 className="zxc text-center text-2xl">Welcome</h1>
                    <p className="text-center text-xs mt-2 text-black/50">
                      Enter your credentials to access your account.
                    </p>
                    <form className="mt-7 flex flex-col gap-4" action="">
                      <div>
                        <label className="text-sm">Email</label>
                        <Input
                          className="mt-2 text-sm shadow-sm bg-input border-1 border-ring"
                          type="email"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-sm">Password</label>
                        <span className="flex items-center">
                          <Input
                            className="p-[0_40px_0_10px] text-sm shadow-sm  bg-input border-1 border-ring"
                            type={showPassword ? "text" : "password"}
                          />

                          <button
                            type="button"
                            className="absolute right-3  text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </span>
                      </div>
                      <div className="text-xs flex justify-between">
                        <span className="flex items-center gap-1">
                          <Checkbox className="shadow-sm" />
                          Remember me
                        </span>

                        <Dialog>
                          <DialogTrigger>Forgot password?</DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="mb-5">
                                Reset Password
                              </DialogTitle>
                              <DialogDescription>
                                Enter your email to receive a reset link.
                              </DialogDescription>
                              <Input type="email" />
                              <Button className="mt-5 w-1/2">
                                Send Reset Link
                              </Button>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      {showOTP && (
                        <div className="flex justify-center items-center w-full flex-col">
                          <p className="text-sm bg-green-100 p-1 text-green-500 text-center w-full">
                            code sent
                          </p>
                          <InputOTP maxLength={6}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      )}

                      <Button
                        className="zxc text-xs mt-5 "
                        onClick={handleSignInClick}
                      >
                        Sign in <LogIn />
                      </Button>
                      <p className="text-sm bg-red-100 p-1 text-red-500 text-center">
                        code not match
                      </p>
                      <div className="text-xs text-center relative flex justify-center items-center mt-3">
                        <div className="border-1 border-black/30 w-full"></div>
                        <div className="absolute bg-background p-1 text-black/70">
                          OR CONTINUE WITH
                        </div>
                      </div>
                      <Button variant="outline " className="shadow-sm">
                        Google
                      </Button>
                    </form>
                    <p className="text-xs text-center mt-5">
                      Don't have an account?{" "}
                      <span
                        className="cursor-pointer underline"
                        onClick={() => {
                          setOpenRegister(true);
                          setOpenLogin(false);
                        }}
                      >
                        Register here
                      </span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {openRegister && (
                  <motion.div
                    className="fixed   inset-0 flex items-center justify-center z-50 backdrop-blur-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="relative shadow-xl px-10 py-12 rounded-2xl bg-background w-[500px]"
                      initial={{ opacity: 0, translateY: 100 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: 100 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    >
                      <X
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={() => {
                          setBg(false),
                            setOpenLogin(false),
                            setOpenRegister(false);
                        }}
                      />
                      <h1 className="zxc text-center text-2xl">
                        Create an Account
                      </h1>
                      <p className="text-center text-xs mt-2 text-black/50">
                        Fill in your details to register.
                      </p>
                      <form className="mt-7 flex flex-col gap-4" action="">
                        <div className="flex justify-between gap-2">
                          <div className="w-full">
                            <label className="text-sm">First name</label>
                            <Input
                              className="mt-2 text-sm shadow-sm  bg-input border-1 border-ring"
                              type="email"
                            />
                          </div>
                          <div className="w-full">
                            <label className="text-sm">Last name</label>
                            <Input
                              className="mt-2 text-sm shadow-sm  bg-input border-1 border-ring"
                              type="email"
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="text-sm">Student ID</label>
                          <Input
                            className="mt-2 text-sm shadow-sm  bg-input border-1 border-ring"
                            type="email"
                          />
                        </div>
                        <div className="w-full">
                          <label className="text-sm">Email</label>
                          <Input
                            className="mt-2 text-sm shadow-sm  bg-input border-1 border-ring"
                            type="email"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-sm ">Password</label>
                          <span className="flex items-center ">
                            <Input
                              className="p-[0_40px_0_10px] text-sm shadow-sm  bg-input border-1 border-ring"
                              type={showPassword ? "text" : "password"}
                            />

                            <button
                              type="button"
                              className="absolute right-3  text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </span>
                          {showOTP && (
                            <div className="flex justify-center items-center w-full flex-col">
                              <p className="text-sm bg-green-100 p-1 text-green-500 text-center w-full">
                                code sent
                              </p>
                              <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2  mt-2">
                          <Checkbox />{" "}
                          <p className="text-sm">Accept terms and conditions</p>
                        </div>

                        <Button
                          className="zxc text-xs"
                          onClick={handleSignInClick}
                        >
                          Sign up <LogIn />
                        </Button>
                        <p className="text-sm bg-red-100 p-1 text-red-500 text-center">
                          code not match
                        </p>
                      </form>
                      <p className="text-xs text-center mt-7">
                        Already have an account?{" "}
                        <span
                          className="cursor-pointer underline"
                          onClick={() => {
                            {
                              setOpenLogin(true), setOpenRegister(false);
                            }
                          }}
                        >
                          Login here
                        </span>
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div className=" h-screen w-full flex justify-center items-center bg-background rounded-xs">
          <div className="relative w-[95%] bg-green-800 h-[75%] rounded-4xl mt-7 animate-gradient shadow-xl flex    overflow-hidden">
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
                className="ml-6  mt-10 bg-green-950"
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
        <div className="h-screen flex flex-col items-center justify-center gap-10 bg-green-200 w-full">
          <h1 className="text-center text-5xl zxc tracking-tighter">
            HOW IT WORKS
          </h1>
          <div className="flex gap-10">
            <span className="relative h-[250px] w-[250px] border-green-800 border-2 flex items-center justify-center p-3 rounded-md">
              <img src={img1} alt="" />
              <h1 className="absolute left-0 -bottom-15 text-[8rem] font-bold text-transparent stroke stroke-2">
                1
              </h1>

              <p className="absolute -bottom-15">Create an account or log in</p>
            </span>

            <span className="relative h-[250px] w-[250px] border-green-800 border-2 flex items-center justify-center p-3 rounded-md">
              <img src={img2} alt="" />
              <h1 className="absolute left-0 -bottom-15 text-[8rem] font-bold text-transparent stroke stroke-2">
                2
              </h1>
              <p className="absolute -bottom-15">
                Fill out the scholarship form
              </p>
            </span>
            <span className="relative h-[250px] w-[250px] border-green-800 border-2 flex items-center justify-center p-3 rounded-md">
              <img src={img3} alt="" />
              <h1 className="absolute left-0 -bottom-15 text-[8rem] font-bold text-transparent stroke stroke-2">
                3
              </h1>
              <p className="absolute -bottom-15">Upload your documents</p>
            </span>
            <span className="relative h-[250px] w-[250px] border-green-800 border-2 flex items-center justify-center p-3 rounded-md">
              <img src={img4} alt="" />
              <h1 className="absolute left-0 -bottom-15 text-[8rem] font-bold text-transparent stroke stroke-2">
                4
              </h1>
              <p className="absolute -bottom-15 whitespace-nowrap">
                Submit and wait for updates via email
              </p>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
