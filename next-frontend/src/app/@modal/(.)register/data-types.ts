export type registerData = {
  studentId: string;
  studentEmail: string;
  studentContact: string;
  studentFirstName: string;
  studentMiddleName: string;
  studentLastName: string;
  studentGender: string;
  studentAddress: {
    province: string;
    city: string;
    barangay: string;
  };
  studentDateofBirth: Date | undefined;
  studentCourseYearSection: {
    course: string;
    year: string;
    section: string;
  };
  studentPassword: string;
  verificationCode: string;
};

export const courses = [
  {
    value: "bsagriculture",
    label: "BSA", // Bachelor of Science in Agriculture
  },
  {
    value: "bsagribusiness",
    label: "BSAB", // Bachelor of Science in Agribusiness
  },
  {
    value: "bsagriculturalbiosystemsengineering",
    label: "BSABE", // Bachelor of Science in Agricultural and Biosystems Engineering
  },
  {
    value: "bsgeodeticengineering",
    label: "BSGE", // Bachelor of Science in Geodetic Engineering
  },
  {
    value: "bsfoodtechnology",
    label: "BSFT", // Bachelor of Science in Food Technology
  },
  {
    value: "bsinformationtechnology",
    label: "BSIT", // Bachelor of Science in Information Technology
  },
  {
    value: "bsbusinessadministration",
    label: "BSBA", // Bachelor of Science in Business Administration (Major in Marketing Management)
  },
  {
    value: "bshospitalitymanagement",
    label: "BSHM", // Bachelor of Science in Hospitality Management
  },
  {
    value: "bselementaryeducation",
    label: "BEEd", // Bachelor in Elementary Education
  },
  {
    value: "bssecondaryeducation",
    label: "BSEd", // Bachelor of Secondary Education
  },
  {
    value: "doctorofveterinarymedicine",
    label: "DVM", // Doctor of Veterinary Medicine
  },
];
export const yearLevels = [
  {
    value: "1st",
    label: "1st Year",
  },
  {
    value: "2nd",
    label: "2nd Year",
  },
  {
    value: "3rd",
    label: "3rd Year",
  },
  {
    value: "4th",
    label: "4th Year",
  },
  {
    value: "5th",
    label: "5th Year", // For programs like DVM or Engineering if applicable
  },
];
export const sections = [
  {
    value: "a",
    label: "Section A",
  },
  {
    value: "b",
    label: "Section B",
  },
  {
    value: "c",
    label: "Section C",
  },
  {
    value: "d",
    label: "Section D",
  },
  {
    value: "e",
    label: "Section E",
  },
];

export const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "undefined",
    label: "Undefined",
  },
  {
    value: "transformers",
    label: "Transformers",
  },
  {
    value: "gay",
    label: "Gay",
  },
];
