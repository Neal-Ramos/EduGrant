import { useEffect, useState } from "react";

interface types {
  name: string;
  code: string;
}
export default function useAddress() {
  const [AddressList, setAddressList] = useState({
    provinces: [] as types[],
    cities: [] as types[],
    barangays: [] as types[],
  });
  const [selectedLocation, setSelectedLocation] = useState({
    selectedProvinces: "",
    selectedCities: "",
    selectedBarangays: "",
  });

  const [disable, setDisable] = useState({
    cityDisable: true,
    barangayDisable: true,
  });
  useEffect(() => {
    async function fetchRegions() {
      const res = await fetch(
        "https://psgc.gitlab.io/api/regions/030000000/provinces/"
      );
      const data = await res.json();
      setAddressList((prev) => ({
        ...prev,
        provinces: data,
      }));
    }
    fetchRegions();
  }, []);

  useEffect(() => {
    async function fetchCity() {
      if (selectedLocation.selectedProvinces) {
        const res = await fetch(
          `https://psgc.gitlab.io/api/provinces/${selectedLocation.selectedProvinces}/cities-municipalities/`
        );
        const data = await res.json();
        setAddressList((prev) => ({
          ...prev,
          cities: data,
        }));
        setDisable((prev) => ({
          ...prev,
          cityDisable: false, // Enable city dropdown after province is selected
        }));
      }
    }
    fetchCity();
  }, [selectedLocation.selectedProvinces]);

  useEffect(() => {
    async function fetchBarangay() {
      if (selectedLocation.selectedCities) {
        const res = await fetch(
          `https://psgc.gitlab.io/api/cities-municipalities/${selectedLocation.selectedCities}/barangays/`
        );
        const data = await res.json();
        setAddressList((prev) => ({
          ...prev,
          barangays: data,
        }));
        setDisable((prev) => ({
          ...prev,
          barangayDisable: false, // Enable barangay dropdown after city is selected
        }));
      }
    }
    fetchBarangay();
  }, [selectedLocation.selectedCities]);

  return {
    AddressList,
    selectedLocation,
    setSelectedLocation,
    disable,
  };
}
