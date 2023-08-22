"use client";
import { useState, useEffect } from "react";
import SalonHeader from "@/components/SalonHeader";
import SalonSidebarNavigation from "@/components/SalonSidebarNavigation";
import Services from "@/components/Services";
import { getServices } from "@/services/Salons";
export default function Servicios() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const id = "1";

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // token ? setLoading(false) : routing.push("/");
    const fetchSalon = async () => {
      const request = await getServices(id);
      setServices(request);
    };
    fetchSalon();
    if (services != null) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {services.length > 0 ? (
          <Services services={services} />
      ) : (
        <>
          <div className="h-full w-full flex justify-center items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-breta-blue"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="black"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </>
      )}
    </>
  );
}
