import { registerData } from "./data-types";
import review from "@/assets/undraw_data-input_whqw.svg";
import { motion } from "framer-motion";
interface ReviewInformationProps {
  data: registerData;
}
export default function ReviewInformation({ data }: ReviewInformationProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-2 gap-5"
      >
        <div className="space-y-5 px-4 w-full">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Review Information
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Double-check your personal and account details before submitting.
            </p>
          </div>

          {/* Section: Account Info */}
          <div className="bg-popover rounded-md overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-primary bg-[var(--eclipse)] py-2 px-4">
              Account Info
            </h2>
            <div className="grid grid-cols-2 gap-6  p-4">
              <div>
                <label className="block text-sm text-gray-500">
                  Student ID
                </label>
                <p className="text-base font-medium">{data.studentId}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Email</label>
                <p className="text-base font-medium">{data.studentEmail}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Contact</label>
                <p className="text-base font-medium">{data.studentContact}</p>
              </div>
            </div>
          </div>

          {/* Section: Name & Personal Info */}
          <div className="bg-popover rounded-md overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-primary bg-[var(--eclipse)] py-2 px-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-2 gap-6  p-4">
              <div>
                <label className="block text-sm text-gray-500">
                  First Name
                </label>
                <p className="text-base font-medium">{data.studentFirstName}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">
                  Middle Name
                </label>
                <p className="text-base font-medium">
                  {data.studentMiddleName}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Last Name</label>
                <p className="text-base font-medium">{data.studentLastName}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Gender</label>
                <p className="text-base font-medium">{data.studentGender}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">
                  Date of Birth
                </label>
                <p className="text-base font-medium">
                  {data.studentDateofBirth?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Address */}
          <div className="bg-popover rounded-md overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-primary bg-[var(--eclipse)] py-2 px-4">
              Address
            </h2>
            <div className="grid grid-cols-2 gap-6  p-4">
              <div>
                <label className="block text-sm text-gray-500">Province</label>
                <p className="text-base font-medium">
                  {data.studentAddress.province}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">City</label>
                <p className="text-base font-medium">
                  {data.studentAddress.city}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Barangay</label>
                <p className="text-base font-medium">
                  {data.studentAddress.barangay}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Academic Info */}
          <div className="bg-popover rounded-md overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-primary bg-[var(--eclipse)] py-2 px-4">
              Academic Details
            </h2>
            <div className="grid grid-cols-2 gap-6  p-4">
              <div>
                <label className="block text-sm text-gray-500">Course</label>
                <p className="text-base font-medium">
                  {data.studentCourseYearSection?.course}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Year</label>
                <p className="text-base font-medium">
                  {data.studentCourseYearSection?.year}
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Section</label>
                <p className="text-base font-medium">
                  {data.studentCourseYearSection?.section}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex justify-center items-start ">
          <img
            className=" w-[70%] object-contain sticky top-0 pointer-events-none"
            src={review.src}
            alt=""
          />
        </div>
      </motion.div>
    </>
  );
}
