"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import SpotlightBorderWrapper from "@/components/ui/border";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, SquarePen, Trash, X } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Controller, useFieldArray, useForm } from "react-hook-form";
interface PageProps {
  params: Promise<{ id: string }>;
}
const options = [
  { label: "PDF", value: "pdf" },
  { label: "Word Document", value: "docx" },
  { label: "JPEG Image)", value: "jpg" },
  { label: "PNG Image", value: "png" },
];
export default function Intercept({ params }: PageProps) {
  const [read, setRead] = useState(true);
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpendialog] = useState(false);

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
  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
  };
  const validateAndOpenDrawer = handleSubmit(() => {
    setOpendialog(true);
  });
  const { id } = use(params);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  if (!open) {
    setTimeout(() => {
      router.back();
    }, 200);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="lg:w-3/4 w-[95%] mx-auto">
        <DrawerHeader>
          <div>
            <DrawerTitle className="text-3xl font-semibold">
              Scholarship Overview ID: {id}
            </DrawerTitle>
            <DrawerDescription>
              {" "}
              Update the form below to edit the scholarship details.
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="mx-auto w-[95%] py-10 overflow-y-auto meow">
          {/* Scholarship Fields */}
          <div className="grid grid-cols-3 lg:gap-y-10 gap-y-6 gap-x-5 mt-5">
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
                  readOnly={read}
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
                  readOnly={read}
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
                  readOnly={read}
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
                  disabled={read}
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
                  disabled={read}
                  type="file"
                  accept="image/*"
                />
              </SpotlightBorderWrapper>
            </span>

            <span className="space-y-3 lg:col-span-1 col-span-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="applicationDeadline">
                  Application Deadline
                </Label>
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
                  readOnly={read}
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
              disabled={read}
            >
              <Plus className="w-4 h-4 mr-1" />
              More requirements
            </Button>
          </div>

          <div className="space-y-4 mt-5">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-3 gap-3 items-center"
              >
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
                      readOnly={read}
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
                            disabled={read}
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
        </div>
        <DrawerFooter>
          <div className="w-full flex gap-3">
            {edit ? (
              <AlertDialog open={openDialog} onOpenChange={setOpendialog}>
                <AlertDialogTrigger className="flex-1" asChild>
                  <Button
                    onClick={validateAndOpenDrawer}
                    className="flex-1 bg-green-800 hover:bg-green-800 text-foreground"
                  >
                    <Save /> Save
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to save these changes? Make sure all
                      the information is correct before proceeding.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmit((data) => {
                        onSubmit(data);
                        setOpendialog(false);
                      })}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                onClick={() => {
                  setEdit(true);
                  setRead(false);
                }}
                className="flex-1 "
              >
                <SquarePen /> Edit
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger className="flex-1" asChild>
                <Button className="w-full" variant="destructive">
                  <Trash /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DrawerClose className="flex-1" asChild>
              <Button className="w-full" variant="outline">
                <X />
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
