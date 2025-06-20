"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/origin-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  GraduationCap,
  Lock,
  Save,
  Edit,
  Sun,
  Moon,
  Check,
  BadgeIcon as IdCard,
  Shield,
  Settings,
  Camera,
} from "lucide-react";
import { useForm } from "react-hook-form";

interface ProfileFormData {
  avatar: string;
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  gender: string;
  dateOfBirth: string;
  province: string;
  city: string;
  barangay: string;
  address: string;
  course: string;
  year: string;
  section: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const avatarOptions = [
  {
    id: "avatar1",
    name: "Professional",
    image: "/placeholder.svg?height=120&width=120&text=👨‍💼",
    description: "Professional look",
  },
  {
    id: "avatar2",
    name: "Casual",
    image: "/placeholder.svg?height=120&width=120&text=👨‍🎓",
    description: "Student casual",
  },
  {
    id: "avatar3",
    name: "Friendly",
    image: "/placeholder.svg?height=120&width=120&text=😊",
    description: "Friendly smile",
  },
];

const provinces = [
  "Metro Manila",
  "Bulacan",
  "Cavite",
  "Laguna",
  "Rizal",
  "Batangas",
  "Pampanga",
  "Nueva Ecija",
  "Tarlac",
  "Zambales",
];

const courses = [
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Engineering",
  "Bachelor of Science in Business Administration",
  "Bachelor of Arts in Communication",
  "Bachelor of Science in Education",
  "Bachelor of Science in Nursing",
  "Bachelor of Science in Agriculture",
];

export default function UserProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("avatar1");
  const [tempSelectedAvatar, setTempSelectedAvatar] = useState("avatar1");
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      avatar: "avatar1",
      studentId: "2021-00123",
      firstName: "Juan",
      middleName: "Santos",
      lastName: "Dela Cruz",
      email: "juan.delacruz@student.basc.edu.ph",
      contactNumber: "+63 912 345 6789",
      gender: "male",
      dateOfBirth: "2000-05-15",
      province: "Bulacan",
      city: "Malolos",
      barangay: "Barangay San Vicente",
      address: "123 Rizal Street, Subdivision Name",
      course: "Bachelor of Science in Computer Science",
      year: "3",
      section: "A",
    },
  });

  const passwordForm = useForm<PasswordFormData>();

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    setIsEditingProfile(false);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Password changed:", data);
    passwordForm.reset();
  };

  const handleAvatarSave = () => {
    setSelectedAvatar(tempSelectedAvatar);
    profileForm.setValue("avatar", tempSelectedAvatar);
    setAvatarDialogOpen(false);
  };

  const handleAvatarCancel = () => {
    setTempSelectedAvatar(selectedAvatar);
    setAvatarDialogOpen(false);
  };

  const newPassword = passwordForm.watch("newPassword");

  return (
    <div className="bg-background min-h-screen">
      <header className="flex w-full items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 shrink-0 items-center gap-5 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-4">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            My Profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your personal information and account settings.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile Information
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Information Tab */}
          <TabsContent value="profile" className="space-y-6">
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-6"
            >
              {/* Profile Picture with User Info */}
              <Card>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    {/* Profile Picture and Info */}
                    <div className="flex flex-col items-center text-center lg:text-left">
                      <div className="relative mb-4 group">
                        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl overflow-hidden border-4 border-background shadow-lg">
                          <img
                            src={
                              avatarOptions.find((a) => a.id === selectedAvatar)
                                ?.image || "/placeholder.svg"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Camera overlay on hover */}
                        <Dialog
                          open={avatarDialogOpen}
                          onOpenChange={setAvatarDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <Camera className="h-8 w-8 text-white" />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Choose Profile Picture
                              </DialogTitle>
                              <DialogDescription>
                                Select an avatar that represents you best. You
                                can change this anytime.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-3 gap-4 py-4">
                              {avatarOptions.map((avatar) => (
                                <div
                                  key={avatar.id}
                                  className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all hover:border-primary hover:shadow-md ${
                                    tempSelectedAvatar === avatar.id
                                      ? "border-primary bg-primary/5 shadow-md"
                                      : "border-muted"
                                  }`}
                                  onClick={() =>
                                    setTempSelectedAvatar(avatar.id)
                                  }
                                >
                                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl mx-auto mb-2 overflow-hidden">
                                    <img
                                      src={avatar.image || "/placeholder.svg"}
                                      alt={avatar.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <p className="text-xs text-center font-medium">
                                    {avatar.name}
                                  </p>
                                  <p className="text-xs text-center text-muted-foreground mt-1">
                                    {avatar.description}
                                  </p>
                                  {tempSelectedAvatar === avatar.id && (
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                      <Check className="w-3 h-3 text-primary-foreground" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            <DialogFooter className="flex gap-2">
                              <Button
                                variant="outline"
                                onClick={handleAvatarCancel}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleAvatarSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Avatar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {/* User Information */}

                      {/* Change Picture Button */}
                      <Dialog
                        open={avatarDialogOpen}
                        onOpenChange={setAvatarDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Camera className="h-4 w-4" />
                            Change Picture
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>

                    {/* Profile Summary Card */}
                    <div className="space-y-2 mb-4">
                      <h2 className="text-2xl font-bold">
                        {profileForm.watch("firstName")}{" "}
                        {profileForm.watch("middleName")}{" "}
                        {profileForm.watch("lastName")}
                      </h2>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <IdCard className="h-4 w-4" />
                        <span className="font-mono text-sm">
                          {profileForm.watch("studentId")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span className="text-sm">
                          {profileForm.watch("year")}
                          {profileForm.watch("year") === "1"
                            ? "st"
                            : profileForm.watch("year") === "2"
                            ? "nd"
                            : profileForm.watch("year") === "3"
                            ? "rd"
                            : "th"}{" "}
                          Year - Section {profileForm.watch("section")}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {profileForm.watch("course")}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IdCard className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Basic Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Basic Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="studentId"
                          className="text-sm font-medium"
                        >
                          Student ID
                        </Label>
                        <Input
                          {...profileForm.register("studentId", {
                            required: "Student ID is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                        />
                        {profileForm.formState.errors.studentId && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.studentId.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          {...profileForm.register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email format",
                            },
                          })}
                          type="email"
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Full Name
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium"
                        >
                          First Name
                        </Label>
                        <Input
                          {...profileForm.register("firstName", {
                            required: "First name is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="middleName"
                          className="text-sm font-medium"
                        >
                          Middle Name
                        </Label>
                        <Input
                          {...profileForm.register("middleName")}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                          placeholder="Optional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium"
                        >
                          Last Name
                        </Label>
                        <Input
                          {...profileForm.register("lastName", {
                            required: "Last name is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact & Personal Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Contact & Personal Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="contactNumber"
                          className="text-sm font-medium"
                        >
                          Contact Number
                        </Label>
                        <Input
                          {...profileForm.register("contactNumber", {
                            required: "Contact number is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                          placeholder="+63 912 345 6789"
                        />
                        {profileForm.formState.errors.contactNumber && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.contactNumber.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-medium">
                          Gender
                        </Label>
                        {isEditingProfile ? (
                          <Select
                            onValueChange={(value) =>
                              profileForm.setValue("gender", value)
                            }
                            defaultValue="male"
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">
                                Prefer not to say
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value="Male"
                            readOnly
                            className="h-11 bg-muted/50 border-muted"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="dateOfBirth"
                          className="text-sm font-medium"
                        >
                          Date of Birth
                        </Label>
                        <Input
                          {...profileForm.register("dateOfBirth", {
                            required: "Date of birth is required",
                          })}
                          type="date"
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                        />
                        {profileForm.formState.errors.dateOfBirth && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.dateOfBirth.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Location Details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Location
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="province"
                          className="text-sm font-medium"
                        >
                          Province
                        </Label>
                        {isEditingProfile ? (
                          <Select
                            onValueChange={(value) =>
                              profileForm.setValue("province", value)
                            }
                            defaultValue="Bulacan"
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                            <SelectContent>
                              {provinces.map((province) => (
                                <SelectItem key={province} value={province}>
                                  {province}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value="Bulacan"
                            readOnly
                            className="h-11 bg-muted/50 border-muted"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">
                          City/Municipality
                        </Label>
                        <Input
                          {...profileForm.register("city", {
                            required: "City is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                          placeholder="Enter city or municipality"
                        />
                        {profileForm.formState.errors.city && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="barangay"
                          className="text-sm font-medium"
                        >
                          Barangay
                        </Label>
                        <Input
                          {...profileForm.register("barangay", {
                            required: "Barangay is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                          placeholder="Enter barangay"
                        />
                        {profileForm.formState.errors.barangay && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.barangay.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Street Address
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Complete Address
                      </Label>
                      <Textarea
                        {...profileForm.register("address", {
                          required: "Address is required",
                        })}
                        readOnly={!isEditingProfile}
                        className={`min-h-[120px] resize-none ${
                          !isEditingProfile ? "bg-muted/50 border-muted" : ""
                        }`}
                        placeholder="House number, street name, subdivision, landmark, etc."
                      />
                      {profileForm.formState.errors.address && (
                        <p className="text-sm text-destructive">
                          {profileForm.formState.errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Course Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Course Details
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="course" className="text-sm font-medium">
                        Course/Program
                      </Label>
                      {isEditingProfile ? (
                        <Select
                          onValueChange={(value) =>
                            profileForm.setValue("course", value)
                          }
                          defaultValue="Bachelor of Science in Computer Science"
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value="Bachelor of Science in Computer Science"
                          readOnly
                          className="h-11 bg-muted/50 border-muted"
                        />
                      )}
                    </div>
                  </div>

                  {/* Year and Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Current Status
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-sm font-medium">
                          Year Level
                        </Label>
                        {isEditingProfile ? (
                          <Select
                            onValueChange={(value) =>
                              profileForm.setValue("year", value)
                            }
                            defaultValue="3"
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st Year</SelectItem>
                              <SelectItem value="2">2nd Year</SelectItem>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                              <SelectItem value="5">5th Year</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value="3rd Year"
                            readOnly
                            className="h-11 bg-muted/50 border-muted"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="section"
                          className="text-sm font-medium"
                        >
                          Section
                        </Label>
                        <Input
                          {...profileForm.register("section", {
                            required: "Section is required",
                          })}
                          readOnly={!isEditingProfile}
                          className={`h-11 ${
                            !isEditingProfile ? "bg-muted/50 border-muted" : ""
                          }`}
                          placeholder="Enter section"
                        />
                        {profileForm.formState.errors.section && (
                          <p className="text-sm text-destructive">
                            {profileForm.formState.errors.section.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isEditingProfile ? (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="button" className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Save Changes?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to save these changes to your
                            profile? Please review all information before
                            proceeding.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={profileForm.handleSubmit(onProfileSubmit)}
                          >
                            Save Changes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Update your password to keep your account secure. Make sure to
                  use a strong password.
                </p>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      {...passwordForm.register("currentPassword", {
                        required: "Current password is required",
                      })}
                      type="password"
                      placeholder="Enter your current password"
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="text-sm text-destructive">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        {...passwordForm.register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        type="password"
                        placeholder="Enter new password"
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-destructive">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        {...passwordForm.register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === newPassword || "Passwords do not match",
                        })}
                        type="password"
                        placeholder="Confirm new password"
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {
                            passwordForm.formState.errors.confirmPassword
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Change Password?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to change your password? You
                          will need to use the new password for future logins.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={passwordForm.handleSubmit(onPasswordSubmit)}
                        >
                          Change Password
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </form>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Last Password Change</h4>
                    <p className="text-sm text-muted-foreground">
                      January 15, 2025
                    </p>
                  </div>
                  <Badge variant="secondary">30 days ago</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Account Status</h4>
                    <p className="text-sm text-muted-foreground">
                      Your account is secure
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
        </Tabs>
      </div>
    </div>
  );
}
