"use client";
import { useEffect, useState } from "react";
export type ScholarshipDetail = {
  scholarshipName: string;
  applicationsReceived: number;
  applicationsApproved: number;
};
export default function useDashboardData() {
  const [data, setData] = useState<ScholarshipDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchScholarships() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("/dashboard.json");
        if (!response.ok) {
          throw new Error("Failed to fetch scholarship data.");
        }
        const scholarships: ScholarshipDetail[] = await response.json();
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

    fetchScholarships();
  }, []);

  return { data, loading, error };
}
