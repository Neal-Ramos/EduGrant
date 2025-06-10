"use client";
import { useEffect, useState } from "react";
type Scholarship = {
  id: string;
  title: string;
  provider: string;
  type: string;
  status: "active" | "closed" | "upcoming";
  region: string;
  deadline: string;
};
export default function useData() {
  const [data, setData] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchScholarships() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch scholarship data.");
        }
        const scholarships: Scholarship[] = await response.json();
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
