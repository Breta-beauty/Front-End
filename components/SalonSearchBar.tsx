"use client";
import { useState, useEffect, use } from "react";
import SalonCard from "./SalonCard";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import { notFound } from "next/navigation";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
export default function SalonSearchBar() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const URL: string = "https://breta-api.onrender.com/graphql";
  const headers = {
    "content-type": "application/json",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(inputValue);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const handleSearch = async (input: String) => {
    if (input.length > 2) {
      setTimeout(async () => {
        const query = `{
          findSalonsBy(findByInput: {
            search_input: "${input}"
          }){
            salon_id
            salon_name
            location
            main_picture
            services{
              service_id
              service_name
            }
          }
        }`;
        const options = {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ query: query }),
        };
        try {
          setLoading(true);
          const response = await fetch(URL, options);
          const data = await response.json();
          const result = data.data;
          if (result != null) {
            setNotFound(false);
            setSearchResults([]);
            setSearchResults(result.findSalonsBy);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <label className="relative">
          <div className="absolute left-3 pt-2">
            <Icons.Search />
          </div>
          <input
            onBlur={() => setSearchResults([])}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-10 text-sm ring-1 ring-gray-300 rounded-md p-2 focus:outline-0 placeholder:text-sm tracking-wider placeholder:text-gray-500 "
            placeholder="Buscar"
          />
        </label>
        <div
          className={`absolute ring-1 ring-gray-300 top-10 w-full flex flex-col bg-white/30 rounded-md p-1 backdrop-blur-2xl ${
            searchResults.length == 0 && loading == false && "hidden"
          }`}
        >
          {loading == true && (
            <>
              <div className="h-full flex justify-center items-center">
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
          {searchResults && (
            <>
              {searchResults.map((salon, index: number) => {
                return (
                  <div className="mb-4" key={index}>
                    <SalonCard
                      title={salon.salon_name}
                      address={
                        salon.location.street +
                        " #" +
                        salon.location.interiorNumber
                      }
                      grade={salon.grade}
                      openState={salon.openState}
                      image={salon.main_picture}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
