import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { GraduationCap, Mail } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [password, setPassword] = useState("");
  const [slideLogin, setslideLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ludeng, setLudeng] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    // navigate("/admin-home")
  },[])
  const [otp, setOtp] = useState("")
  const handleOtpChange = (value) => {
    setOtp(value);
  };
  const handleLoginButton = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = { adminEmail: email, adminPassword: password}
    try {
      console.log(data);
      const res = await axios.post(`${import.meta.env.VITE_EXPRESS_API_EDUGRANT_ADMIN}/adminLogin`,data,{ withCredentials: true });
      if (res.status === 200) {
        toast("Code sent to email", {
          description:
            "Please check your inbox for the verification code.",
        })
        console.log(res)
        setShowOTP(true);
        setslideLogin(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  const handleSendOtp = async () => {
      setLoading(true)
    try {
      const data = {code:otp, origin:"adminLogin", adminEmail:email}
      const res = await axios.post(`${import.meta.env.VITE_EXPRESS_API_EDUGRANT_ADMIN}/adminCodeAuthentication`,data,{ withCredentials: true });
      console.log(res)
      if(res.status === 200){navigate("/admin-home")}
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div
      className="
      h-screen flex items-center justify-center w-full"
    >
      <AnimatePresence mode="wait">
        {slideLogin && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md  rounded-xl"
          >
            <span className="flex flex-col justify-center items-center gap-3">
              <GraduationCap
                size={60}
                className="bg-green-900 text-white p-1 rounded-2xl"
              />
              <h1 className="text-3xl zxc tracking-[-4px]">EDUGRANT ADMIN</h1>
            </span>
            <div className="bg-gray-200 flex justify-center items-center p-[3px] gap-2 rounded mt-8">
              <span className="w-full bg-white text-center p-1 rounded">
                Login
              </span>
              <span className="w-full text-center p-1 text-black/50">
                Verification
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">Login Your Account</h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your account.
            </p>
            <form className="mt-8">
              <div className="flex flex-col gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 border rounded ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm bg-red-50 p-1 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </Label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 border rounded ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm bg-red-50 p-1 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="w-full flex justify-between font-semibold items-center text-sm cursor-pointer">
                  <p className="flex items-center gap-2">
                    <Checkbox />
                    Remember me
                  </p>
                </div>
                <Button
                  onClick={handleLoginButton}
                  className=" rounded"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </div>
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
            className="w-full max-w-sm   rounded-xl "
          >
            <div className="bg-gray-200 flex justify-center items-center p-[3px] gap-2 rounded mb-8">
              <span className="w-full text-center p-1 text-black/50">
                Login
              </span>
              <span className="w-full text-center bg-white p-1">
                Verification
              </span>
            </div>
            <div className="flex justify-center items-center flex-col gap-3 mt-3">
              <Send size={50} strokeWidth={1.5} />
              <h2 className="text-xl font-semibold">OTP VERIFICATION</h2>
            </div>
            <p className="text-sm text-gray-500 text-center">
              We sent a code to your Gmail.
            </p>
            <div className="mt-4 flex justify-center">
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
            <div className=" mt-8 flex items-center justify-center gap-3">
              Didn't recieve the code? <p className="underline">Resend Now</p>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <Button
                type="submit"
                className="rounded"
                disabled={loading}
                onClick={handleSendOtp}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
              <Button
                variant="outline"
                className="rounded"
                onClick={() => {
                  setShowOTP(false);
                  setslideLogin(true);
                }}
              >
                Back
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

  
    </div>
  );
}
