import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Send } from "lucide-react";
import bascLogo from "../assets/basclogo.png";
import bascImage from "../assets/BASCjf5989_03 copy.jpg";

import edugrantlogo from "@/assets/greenlogo.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion, AnimatePresence } from "framer-motion";
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

import axios from "axios";
import { useNavigate } from "react-router-dom";

function DrawerDemo() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const validateForm = () => {
    let valid = true;
    let errors = {
      email: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email";
      valid = false;
    }

    if (!firstName) {
      errors.firstName = "First Name is required";
      valid = false;
    }
    if (!middleName) {
      errors.middleName = "Middle Name is required";
      valid = false;
    }
    if (!lastName) {
      errors.lastName = "Last Name is required";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const [loading, setLoading] = useState(false);

  const validateFormLogin = () => {
    let valid = true;
    let errors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const [otp, setOtp] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const navigate = useNavigate();

  const handleLoginButton = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = { userEmail: email, userPassword: password };
    try {
      if (validateFormLogin()) {
        console.log(data);
        const res = await axios.post(
          `${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/login`,
          data,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setShowOTP(true);
          setslideLogin(false);
          setLoading(false);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleOTPVerificationLogin = async () => {
    setLoading(true);
    const data = {
      code: otp,
      origin: "login",
      userEmail: email,
      userPassword: password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/codeAuthenticationLogin`,
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res);
        navigate("/home");
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const RegisterhandleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (validateForm()) {
      const data = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        userEmail: email,
        userPassword: password,
      };
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_EXPRESS_API_EDUGRANT}/registerAccount`,
          data
        );
        if (res.status === 200) {
          console.log(res);
          setShowOTP(true);
          setslideLogin(false);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  const handleOTPVerificationRegister = async () => {
    setLoading(true);
    const data = {
      code: otp,
      origin: "registration",
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      userEmail: email,
      userPassword: password,
    };
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_EXPRESS_API_EDUGRANT
        }/codeAuthenticationRegistration`,
        data
      );
      if (res.status === 201) {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setOtp("");
        alert(res.data.message);
        setShowOTP(false);
        setslideLogin(true);
        setshowRegister(false);
        setshowLogin(true);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [showOTP, setShowOTP] = useState(false);
  const [slideLogin, setslideLogin] = useState(true);
  const [showLogin, setshowLogin] = useState(true);
  const [showRegister, setshowRegister] = useState(false);
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="lg">Login</Button>
      </DrawerTrigger>
      <DrawerContent>
        {showLogin && (
          <AnimatePresence mode="wait">
            {slideLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm "
              >
                <DrawerHeader>
                  <div className="bg-gray-200 flex justify-center items-center p-[3px] gap-2 rounded-sm">
                    <span className="w-full text-center bg-white p-1 rounded-xs">
                      Login
                    </span>
                    <span className="w-full text-center p-1 rounded-xs text-black/50">
                      Verification
                    </span>
                  </div>
                  <DrawerTitle className="mt-3">Login Your Account</DrawerTitle>
                  <DrawerDescription>
                    Enter your credentials to access your account.
                  </DrawerDescription>
                </DrawerHeader>
                <form>
                  <div className="p-4 flex gap-3 flex-col">
                    <span className="flex gap-2 flex-col">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm bg-red-50 p-1">
                          {errors.email}
                        </p>
                      )}
                    </span>
                    <span className="flex gap-2 flex-col">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm bg-red-50 p-1">
                          {errors.password}
                        </p>
                      )}
                    </span>
                  </div>
                  <DrawerFooter>
                    <Button
                      onClick={handleLoginButton}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </Button>
                    <span className="relative text-center flex justify-center items-center mt-3">
                      <p className="bg-white z-1 p-1 text-xs">
                        OR CONTINUE WITH
                      </p>
                      <div className="absolute border-1 border-black/50 w-full"></div>
                    </span>

                    <Button className="mt-2" variant="outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 20 20"
                        style={{ fill: "green" }}
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                      Google
                    </Button>
                    <p className="text-center">
                      Don't have an account?{" "}
                      <span
                        className="underline"
                        onClick={() => {
                          setshowLogin(false);
                          setshowRegister(true);
                        }}
                      >
                        Register here
                      </span>
                    </p>
                  </DrawerFooter>
                </form>
              </motion.div>
            )}

            {showOTP && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm "
              >
                <DrawerHeader>
                  <div className="bg-gray-200 flex justify-center items-center p-[3px] gap-2 rounded-sm">
                    <span className="w-full text-center  p-1 rounded-xs text-black/50">
                      Login
                    </span>
                    <span className="w-full text-center bg-white p-1 rounded-xs ">
                      Verification
                    </span>
                  </div>
                  <DrawerTitle className="flex justify-center items-center flex-col gap-3 mt-3">
                    <Send size={50} strokeWidth={1.5} />
                    OTP VERIFICATION
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    We sent a code to you gmail.
                  </DrawerDescription>
                </DrawerHeader>
                <div>
                  <div className="p-4 flex gap-3 justify-center items-center">
                    <InputOTP maxLength={6} onChange={handleOtpChange}>
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
                  <DrawerFooter>
                    <Button
                      onClick={handleOTPVerificationLogin}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowOTP(false);
                        setslideLogin(true);
                      }}
                    >
                      Back
                    </Button>
                  </DrawerFooter>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {showRegister && (
          <AnimatePresence mode="wait">
            {slideLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm "
              >
                <DrawerHeader>
                  <div className="bg-gray-200 flex justify-center items-center p-[3px] gap-2 rounded-sm">
                    <span className="w-full text-center bg-white p-1 rounded-xs">
                      Register
                    </span>
                    <span className="w-full text-center p-1 rounded-xs text-black/50">
                      Verification
                    </span>
                  </div>
                  <DrawerTitle className="mt-3">Create An Account</DrawerTitle>
                  <DrawerDescription>
                    Enter your details to create a new account.
                  </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={RegisterhandleSubmit}>
                  <div className="p-4 flex gap-3 flex-col">
                    <span className="flex flex-col items-end justify-center gap-2">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Label className="w-[40%]" htmlFor="firstName">
                          First Name
                        </Label>
                        <Input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-xs bg-red-50 p-1">
                          {errors.firstName}
                        </p>
                      )}
                    </span>
                    <span className="flex flex-col items-end justify-center gap-2">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Label className="w-[40%]" htmlFor="middleName">
                          Middle Name
                        </Label>
                        <Input
                          type="text"
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
                          className={errors.middleName ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.middleName && (
                        <p className="text-red-500 text-xs bg-red-50 p-1">
                          {errors.middleName}
                        </p>
                      )}
                    </span>
                    <span className="flex flex-col items-end justify-center gap-2">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Label className="w-[40%]" htmlFor="lastName">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-500 text-xs bg-red-50 p-1">
                          {errors.lastName}
                        </p>
                      )}
                    </span>
                    <span className="flex flex-col items-end justify-center gap-2">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Label className="w-[40%]" htmlFor="email">
                          Email
                        </Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs bg-red-50 p-1">
                          {errors.email}
                        </p>
                      )}
                    </span>
                    <span className="flex flex-col items-end justify-center gap-2">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Label className="w-[40%]" htmlFor="password">
                          Password
                        </Label>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={errors.password ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs bg-red-50 p-1">
                          {errors.password}
                        </p>
                      )}
                    </span>
                  </div>
                  <DrawerFooter>
                    <Button disabled={loading} type="submit">
                      {loading ? "Loading.." : "Register"}
                    </Button>
                    <p className="text-center">
                      Already have an account?{" "}
                      <span
                        className="underline"
                        onClick={() => {
                          setshowLogin(true);
                          setshowRegister(false);
                        }}
                      >
                        Login here
                      </span>
                    </p>
                  </DrawerFooter>
                </form>
              </motion.div>
            )}

            {showOTP && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm "
              >
                <DrawerHeader>
                  <div className="bg-gray-200 flex justify-center items-center p-[3px] gap-2 rounded-sm">
                    <span className="w-full text-center  p-1 rounded-xs text-black/50">
                      Register
                    </span>
                    <span className="w-full text-center bg-white p-1 rounded-xs ">
                      Verification
                    </span>
                  </div>
                  <DrawerTitle className="flex justify-center items-center flex-col gap-3 mt-3">
                    <Send size={50} strokeWidth={1.5} />
                    OTP VERIFICATION
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    We sent a code to you gmail.
                  </DrawerDescription>
                </DrawerHeader>
                <div>
                  <div className="p-4 flex gap-3 justify-center items-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={handleOtpChange}
                    >
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
                  <DrawerFooter>
                    <Button
                      onClick={handleOTPVerificationRegister}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Register"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowOTP(false);
                        setslideLogin(true);
                      }}
                    >
                      Back
                    </Button>
                  </DrawerFooter>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default function ClientLogin() {
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
