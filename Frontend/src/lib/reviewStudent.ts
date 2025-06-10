"use client";
import { useEffect, useState } from "react";
import { StudentTypes } from "@/app/administrator/home/applications/review/studentTypes";

export default function useStudentReview() {
  const [data, setData] = useState<StudentTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudent() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await fetch("/student-review.json");
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }
        const student: StudentTypes = await response.json();
        setData(student);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, []);

  return { data, loading, error };
}
