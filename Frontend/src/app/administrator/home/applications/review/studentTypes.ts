export type Document = {
  documentId: string;
  name: string;
  fileUrl: string;
  uploadedDate: string;
};

export type ApplicationHistory = {
  status: string;
  date: string;
  by: string;
};

export type Application = {
  scholarshipId: string;
  scholarshipName: string;
  priority: number;
  status: "Approved" | "Pending" | "Under Review" | "Withdrawn" | string;
  submittedDate: string;
  documents: Document[]; // updated to use the new Document type
  adminRemarks: string;
  reviewedBy: string | null;
  reviewDate: string | null;
  history: ApplicationHistory[];
};

export type StudentTypes = {
  id: string;
  studentId: string;
  fullName: string;
  course: string;
  yearLevel: string;
  applications: Application[];
};
