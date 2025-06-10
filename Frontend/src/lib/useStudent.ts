"use client";
import { useEffect, useState } from "react";
import { StudentTypes } from "@/app/administrator/home/applications/review/studentTypes";

export default function useStudent() {
  const [data, setData] = useState<StudentTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchStudents() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("/student.json");
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }
        const scholarships: StudentTypes[] = await response.json();
        setData(scholarships);
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

    fetchStudents();
  }, []);

  return { data, loading, error };
}
