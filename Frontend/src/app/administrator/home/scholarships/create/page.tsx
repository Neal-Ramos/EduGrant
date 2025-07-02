"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import SpotlightBorderWrapper from "@/components/ui/border";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/dark-mode";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import {createScholarships} from "./axios_fetch";

export default function Create() {
  const [openDrawer, setOpenDrawer] = useState(false);
  type FormData = {
    scholarshipTitle: string;
    providerName: string;
    scholarshipDescription: string;
    applicationDeadline: string;
    detailsImage: FileList;
    sponsorLogo: FileList;
    documents: {
      label: string;
      formats: string[];
    }[];
  };
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      documents: [{ label: "", formats: [] }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });
  const onSubmit = async (data: FormData) => {
    createScholarships(data)
  };
  const validateAndOpenDrawer = handleSubmit(() => {
    setOpenDrawer(true);
  });
  const options = [
    { label: "PDF", value: "pdf" },
    { label: "Word Document", value: "docx" },
    { label: "JPEG Image)", value: "jpg" },
    { label: "PNG Image", value: "png" },
  ];

  return (
    <div className="pl-1 pr-2 your-class">
      <header className="flex w-full items-center justify-between your-class2 border-b rounded-md top-2 relative">
        <div className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">
                  Scholarship Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-3">
          <ModeToggle />
        </div>
      </header>

      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">
          Create a New Scholarship Opportunity
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill out the form below to add a new scholarship.
        </p>

        {/* Scholarship Fields */}
        <div className="grid grid-cols-3 lg:gap-y-10 gap-y-6 gap-x-5 mt-10">
          <span className="space-y-3 lg:col-span-2 col-span-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="scholarshipTitle">Scholarship Title</Label>
              {errors.scholarshipTitle && (
                <p className="text-red-500 text-sm">
                  {errors.scholarshipTitle.message}
                </p>
              )}
            </div>
            <SpotlightBorderWrapper>
              <Input
                {...register("scholarshipTitle", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Min of 3 chars",
                  },
                })}
                placeholder="e.g. CHED Scholarship"
              />
            </SpotlightBorderWrapper>
          </span>

          <span className="space-y-3 lg:col-span-1 col-span-3">
            <div className="flex justify-between items-center">
              <Label className="truncate" htmlFor="providerName">
                Provider / Organization Name
              </Label>
              {errors.providerName && (
                <p className="text-red-500 text-sm truncate">
                  {errors.providerName.message}
                </p>
              )}
            </div>
            <SpotlightBorderWrapper>
              <Input
                {...register("providerName", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Min of 3 chars",
                  },
                })}
                placeholder="e.g. CHED"
              />
            </SpotlightBorderWrapper>
          </span>

          <span className="col-span-3 space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="scholarshipDescription">
                Scholarship Description
              </Label>
              {errors.scholarshipDescription && (
                <p className="text-red-500 text-sm truncate">
                  {errors.scholarshipDescription.message}
                </p>
              )}
            </div>
            <SpotlightBorderWrapper>
              <Textarea
                {...register("scholarshipDescription", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Min of 3 chars",
                  },
                })}
                placeholder="Detailed information about the scholarship..."
              />
            </SpotlightBorderWrapper>
          </span>

          <span className="space-y-3 lg:col-span-1 col-span-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="detailsImage">Full Details Image</Label>
              {errors.detailsImage && (
                <p className="text-red-500 text-sm truncate">
                  {errors.detailsImage.message}
                </p>
              )}
            </div>
            <SpotlightBorderWrapper>
              <Input
                {...register("detailsImage", {
                  required: "Required",
                })}
                type="file"
                accept="image/*"
              />
            </SpotlightBorderWrapper>
          </span>

          <span className="space-y-3 lg:col-span-1 col-span-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="sponsorLogo">Sponsor Logo</Label>
              {errors.sponsorLogo && (
                <p className="text-red-500 text-sm truncate">
                  {errors.sponsorLogo.message}
                </p>
              )}
            </div>
            <SpotlightBorderWrapper>
              <Input
                {...register("sponsorLogo", {
                  required: "Required",
                })}
                type="file"
                accept="image/*"
              />
            </SpotlightBorderWrapper>
          </span>

          <span className="space-y-3 lg:col-span-1 col-span-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="applicationDeadline">Application Deadline</Label>
              {errors.applicationDeadline && (
                <p className="text-red-500 text-sm truncate">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            <SpotlightBorderWrapper>
              <Input
                {...register("applicationDeadline", {
                  required: "Required",
                })}
                type="date"
              />
            </SpotlightBorderWrapper>
          </span>
        </div>

        {/* Dynamic Required Documents */}
        <div className="w-full flex items-center justify-between mt-10">
          <h2 className="font-semibold text-lg">Required Documents</h2>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ label: "", formats: [] })}
          >
            <Plus className="w-4 h-4 mr-1" />
            More requirements
          </Button>
        </div>

        <div className="space-y-4 mt-5">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-3 items-center">
              {/* Label */}
              <div className="lg:col-span-1 col-span-3 space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor={`documents.${index}.label`}>
                    Document Label {index + 1}
                  </Label>
                  {errors.documents?.[index]?.label && (
                    <p className="text-red-500 text-sm truncate">
                      {errors.documents[index].label?.message}
                    </p>
                  )}
                </div>
                <SpotlightBorderWrapper>
                  <Input
                    {...register(`documents.${index}.label`, {
                      required: "Required",
                    })}
                    placeholder="e.g. COR"
                  />
                </SpotlightBorderWrapper>
              </div>

              {/* Formats */}
              <div className="lg:col-span-1 col-span-3 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor={`documents.${index}.formats`}>
                    Document Formats
                  </Label>
                  {errors.documents?.[index]?.formats && (
                    <p className="text-red-500 text-sm truncate">
                      {errors.documents[index].formats?.message}
                    </p>
                  )}
                </div>
                <Controller
                  control={control}
                  name={`documents.${index}.formats`}
                  rules={{
                    validate: (value) =>
                      (value && value.length > 0) ||
                      "At least one format is required",
                  }}
                  render={({ field }) => (
                    <>
                      <SpotlightBorderWrapper>
                        <MultiSelect
                          options={options}
                          selected={field.value || []}
                          onChange={field.onChange}
                          placeholder="Choose formats"
                        />
                      </SpotlightBorderWrapper>
                    </>
                  )}
                />
              </div>

              {/* File + Remove */}
              <div className="lg:col-span-1 col-span-3 flex items-end gap-2 lg:mt-6 mt-3">
                <Input type="file" disabled />
                <Button
                  type="button"
                  variant="destructive"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Drawer
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          direction="right"
        >
          <DrawerTrigger asChild>
            <Button
              type="submit"
              onClick={validateAndOpenDrawer}
              className="mt-10 w-full"
            >
              Add Scholarship
            </Button>
          </DrawerTrigger>

          <DrawerContent className="w-3/4 mx-auto">
            <DrawerHeader>
              <DrawerTitle>Review Scholarship Details</DrawerTitle>
              <DrawerDescription>
                Check the information below before submitting.
              </DrawerDescription>
            </DrawerHeader>

            <div className="overflow-y-auto">
              <div className="p-4 grid gap-4">
                <div className="space-y-2">
                  <Label>Scholarship Title</Label>
                  <Input value={watch("scholarshipTitle")} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Input value={watch("providerName")} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={watch("scholarshipDescription")} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Application Deadline</Label>
                  <Input
                    type="date"
                    value={watch("applicationDeadline")}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  {watch("documents")?.map((doc, index) => (
                    <div key={index} className="space-y-2 mt-10">
                      <Label>Required Document {index + 1}</Label>
                      <Input value={doc.label} readOnly />

                      <Label>Accepted Formats</Label>
                      <Input value={doc.formats.join(", ")} readOnly />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={handleSubmit(onSubmit)} type="submit">
                Submit
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
