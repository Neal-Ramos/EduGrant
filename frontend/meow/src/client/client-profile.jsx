import * as React from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import Notification from "./notif";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

export default function ClientProfile() {
  const [profilePic, setProfilePic] = React.useState(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">General</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Student Profile
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <main className="p-6">
        <div className="bg-white rounded-md shadow-md p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex justify-center items-end">
              <img
                src={
                  profilePic ||
                  "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                }
                alt="Profile"
                className="h-48 w-48 rounded-full object-cover ring-4 ring-indigo-200 hover:scale-105 transition-transform"
              />

              {/* Hidden file input */}
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="hidden"
              />

              {/* Custom label button */}
              <label
                htmlFor="upload"
                className="absolute  bg-zinc-600 text-white text-sm py-2 px-3 rounded-md shadow-md hover:bg-indigo-700 cursor-pointer transition"
              >
                Change Photo
              </label>
            </div>

            <h2 className="font-semibold text-gray-700">
              Student ID: 20251001
            </h2>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-3">
            <h1 className="text-4xl font-bold text-gray-800">Juan Dela Cruz</h1>
            <h3 className="text-lg font-medium text-green-600">BSIT - 3A</h3>
            <p className="text-gray-600">juandelacruz@gmail.com</p>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-7">
          <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. 09123456789"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter your address"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter password"
              />
            </div>

            {/* Change Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Change Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="New password"
              />
            </div>

            {/* Submit Button (Optional) */}
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
