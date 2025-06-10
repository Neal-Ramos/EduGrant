import SpotlightBorderWrapper from "@/components/ui/border";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import personal from "@/assets/undraw_social-bio_2xzi.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import useAddress from "@/lib/useAddress";
import {
  registerData,
  courses,
  yearLevels,
  sections,
  genders,
} from "./data-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronDownIcon,
  ChevronsUpDown,
  UserRoundCog,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
type Props = {
  register: UseFormRegister<registerData>;
  errors: FieldErrors<registerData>;
  control: Control<registerData>;
};
export default function PersonalDetails({ register, errors, control }: Props) {
  const { AddressList, selectedLocation, setSelectedLocation, disable } =
    useAddress();
  const [open, setOpen] = useState({
    course: false,
    year: false,
    section: false,
    gender: false,
    province: false,
    city: false,
    barangay: false,
    calendar: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="grid grid-cols-2 gap-5 "
    >
      <div className="grid grid-cols-2 gap-y-7 gap-x-3 px-4 ">
        <div className="col-span-2">
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            <UserRoundCog />
            Personal Information
          </h1>
          <p className="text-muted-foreground">
            Provide your full name and other personal details.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentFirstName">First name</Label>
            {errors.studentFirstName && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentFirstName.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <Input
              {...register("studentFirstName", {
                required: "Required",
              })}
              id="studentFirstName"
              placeholder="Enter your first name"
              className={errors.studentFirstName ? `border border-red-500` : ""}
            />
          </SpotlightBorderWrapper>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentMiddleName">Middle name</Label>
            {errors.studentMiddleName && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentMiddleName.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <Input
              {...register("studentMiddleName", {
                required: "Required",
              })}
              id="studentMiddleName"
              placeholder="Enter your middle name"
              className={
                errors.studentMiddleName ? `border border-red-500` : ""
              }
            />
          </SpotlightBorderWrapper>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentLastName">Last name</Label>
            {errors.studentLastName && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentLastName.message}
              </p>
            )}
          </div>
          <SpotlightBorderWrapper>
            <Input
              {...register("studentLastName", {
                required: "Required",
              })}
              id="last-name"
              placeholder="Enter your last name"
              className={errors.studentLastName ? `border border-red-500` : ""}
            />
          </SpotlightBorderWrapper>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentGender">Gender</Label>
            {errors.studentGender && (
              <p className="text-red-500 text-sm">
                {errors.studentGender.message}
              </p>
            )}
          </div>
          <Controller
            control={control}
            name="studentGender"
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Popover
                open={open.gender}
                onOpenChange={(o) =>
                  setOpen((prev) => ({ ...prev, gender: o }))
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open.gender}
                    className={cn(
                      "w-full justify-between",
                      errors.studentGender ? " !border-red-500" : ""
                    )}
                  >
                    {genders.find((gender) => gender.value === field.value)
                      ?.label ?? "Select gender..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No gender found.</CommandEmpty>
                      <CommandGroup>
                        {genders.map((gender) => (
                          <CommandItem
                            key={gender.value}
                            value={gender.value}
                            onSelect={() => {
                              field.onChange(gender.value);
                              setOpen((prev) => ({ ...prev, gender: false }));
                            }}
                          >
                            {gender.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === gender.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        <div className="space-y-2 ">
          <div className="flex justify-between items-center">
            <Label htmlFor="studentDateofBirth">Date of Birth</Label>
            {errors.studentDateofBirth && (
              <p className="text-red-500 text-sm">
                {" "}
                {errors.studentDateofBirth.message}
              </p>
            )}
          </div>

          <SpotlightBorderWrapper>
            {/* <Input
              {...register("studentDateofBirth", {
                required: "Required",
              })}
              id="studentDateofBirth"
              placeholder="Enter your birth date"
              type="date"
              className={
                errors.studentDateofBirth ? `border border-red-500` : ""
              }
            /> */}
            <Controller
              control={control}
              name="studentDateofBirth"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Popover
                  open={open.calendar}
                  onOpenChange={(o) =>
                    setOpen((prev) => ({ ...prev, calendar: o }))
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className={cn(
                        "w-full justify-between",
                        errors.studentDateofBirth
                          ? "border !border-red-500"
                          : ""
                      )}
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpen((prev) => ({ ...prev, calendar: false }));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </SpotlightBorderWrapper>
        </div>

        <div className="space-y-2  col-span-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="address">Address</Label>
            {(errors.studentAddress?.province ||
              errors.studentAddress?.city ||
              errors.studentAddress?.barangay) && (
              <p className="text-red-500 text-sm">All fields are Required</p>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <Controller
              control={control}
              name="studentAddress.province"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Popover
                    open={open.province}
                    onOpenChange={(o) =>
                      setOpen((prev) => ({ ...prev, province: o }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open.province}
                        className={cn(
                          "w-full justify-between",
                          errors.studentAddress?.province
                            ? "border !border-red-500"
                            : ""
                        )}
                      >
                        {selectedLocation.selectedProvinces
                          ? AddressList.provinces.find(
                              (g) =>
                                g.code === selectedLocation.selectedProvinces
                            )?.name
                          : "Province..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Province..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No province found.</CommandEmpty>
                          <CommandGroup>
                            {AddressList.provinces.map((g) => (
                              <CommandItem
                                key={g.code}
                                value={g.name}
                                onSelect={() => {
                                  field.onChange(g.name);
                                  setSelectedLocation((prev) => ({
                                    ...prev,
                                    selectedProvinces: g.code,
                                    selectedCities: "",
                                    selectedBarangays: "",
                                  }));
                                  setOpen((prev) => ({
                                    ...prev,
                                    province: false,
                                  }));
                                }}
                              >
                                {g.name}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    selectedLocation.selectedProvinces ===
                                      g.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              control={control}
              name="studentAddress.city"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Popover
                    open={open.city}
                    onOpenChange={(o) =>
                      setOpen((prev) => ({ ...prev, city: o }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open.city}
                        className={cn(
                          "w-full justify-between",
                          errors.studentAddress?.city
                            ? "border !border-red-500"
                            : ""
                        )}
                        disabled={disable.cityDisable}
                      >
                        {selectedLocation.selectedCities
                          ? AddressList.cities.find(
                              (g) => g.code === selectedLocation.selectedCities
                            )?.name
                          : "Select City / Municipality..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search City..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            {AddressList.cities.map((g) => (
                              <CommandItem
                                key={g.code}
                                value={g.name}
                                onSelect={() => {
                                  field.onChange(g.name);
                                  setSelectedLocation((prev) => ({
                                    ...prev,
                                    selectedCities: g.code,
                                    selectedBarangays: "",
                                  }));
                                  setOpen((prev) => ({ ...prev, city: false }));
                                }}
                              >
                                {g.name}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    selectedLocation.selectedCities === g.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              control={control}
              name="studentAddress.barangay"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Popover
                    open={open.barangay}
                    onOpenChange={(o) =>
                      setOpen((prev) => ({ ...prev, barangay: o }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open.barangay}
                        className={cn(
                          "w-full justify-between",
                          errors.studentAddress?.barangay
                            ? "border !border-red-500"
                            : ""
                        )}
                        disabled={disable.barangayDisable}
                      >
                        {selectedLocation.selectedBarangays
                          ? AddressList.barangays.find(
                              (g) =>
                                g.code === selectedLocation.selectedBarangays
                            )?.name
                          : "Select Barangay..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Barangay..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No barangay found.</CommandEmpty>
                          <CommandGroup>
                            {AddressList.barangays.map((g) => (
                              <CommandItem
                                key={g.code}
                                value={g.name}
                                onSelect={() => {
                                  field.onChange(g.name);
                                  setSelectedLocation((prev) => ({
                                    ...prev,
                                    selectedBarangays: g.code,
                                  }));
                                  setOpen((prev) => ({
                                    ...prev,
                                    barangay: false,
                                  }));
                                }}
                              >
                                {g.name}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    selectedLocation.selectedBarangays ===
                                      g.code
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </div>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="course-info">Course / Year / Section</Label>
            {(errors.studentCourseYearSection?.course ||
              errors.studentCourseYearSection?.year ||
              errors.studentCourseYearSection?.section) && (
              <p className="text-red-500 text-sm">All fields are required</p>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <Controller
              control={control}
              name="studentCourseYearSection.course"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Popover
                    open={open.course}
                    onOpenChange={(o) =>
                      setOpen((prev) => ({ ...prev, course: o }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open.course}
                        className={cn(
                          "w-full justify-between",
                          errors.studentCourseYearSection?.course
                            ? `border !border-red-500`
                            : ""
                        )}
                      >
                        {field.value
                          ? courses.find((c) => c.label === field.value)?.label
                          : "Course..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Course..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No course found.</CommandEmpty>
                          <CommandGroup>
                            {courses.map((c) => (
                              <CommandItem
                                key={c.value}
                                value={c.value}
                                onSelect={() => {
                                  field.onChange(c.label);
                                  setOpen((prev) => ({
                                    ...prev,
                                    course: false,
                                  }));
                                }}
                              >
                                {c.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === c.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              control={control}
              name="studentCourseYearSection.year"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Popover
                    open={open.year}
                    onOpenChange={(o) =>
                      setOpen((prev) => ({ ...prev, year: o }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open.year}
                        className={cn(
                          "w-full justify-between",
                          errors.studentCourseYearSection?.year
                            ? `border !border-red-500`
                            : ""
                        )}
                      >
                        {field.value
                          ? yearLevels.find((c) => c.label === field.value)
                              ?.label
                          : "Year..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Year..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No year found.</CommandEmpty>
                          <CommandGroup>
                            {yearLevels.map((c) => (
                              <CommandItem
                                key={c.value}
                                value={c.value}
                                onSelect={() => {
                                  field.onChange(c.label);
                                  setOpen((prev) => ({ ...prev, year: false }));
                                }}
                              >
                                {c.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === c.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              control={control}
              name="studentCourseYearSection.section"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <div className="flex-1">
                  <Popover
                    open={open.section}
                    onOpenChange={(o) =>
                      setOpen((prev) => ({ ...prev, section: o }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open.section}
                        className={cn(
                          "w-full justify-between",
                          errors.studentCourseYearSection?.section
                            ? `border !border-red-500`
                            : ""
                        )}
                      >
                        {field.value
                          ? sections.find((c) => c.label === field.value)?.label
                          : "Section..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Section..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No section found.</CommandEmpty>
                          <CommandGroup>
                            {sections.map((c) => (
                              <CommandItem
                                key={c.value}
                                value={c.value}
                                onSelect={() => {
                                  field.onChange(c.label);
                                  setOpen((prev) => ({
                                    ...prev,
                                    section: false,
                                  }));
                                }}
                              >
                                {c.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === c.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center  bg-gradient-to-br from-[var(--eclipse)] via-[rgba(30,175,115,0.15)] to-transparent rounded-lg">
        <img
          className="w-[80%] object-contain sticky top-0 pointer-events-none"
          src={personal.src}
          alt=""
        />
      </div>
    </motion.div>
  );
}
