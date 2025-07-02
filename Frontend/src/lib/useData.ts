"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type Scholarship = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: "active" | "closed" | "upcoming"
  scholarshipDealine: string;
};
export default function useData() {
  const [data, setData] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchScholarships() {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_API}/getScholarships`,{},{withCredentials:true});
        if(res.status === 200){
          setData(res.data)
        }
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // const response = await fetch("/data.json");
        // if (!response.ok) {
        //   throw new Error("Failed to fetch scholarship data.");
        // }
        // const scholarships: Scholarship[] = await response.json();
        // setData(scholarships);
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
