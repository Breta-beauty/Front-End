"use client";
import { useState, useEffect, use } from "react";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();
export default function SalonSearchBar() {
  interface searchResults {
    searchResult: searchResult;
  }
  [];
  interface searchResult {
    name: string;
    type: string;
  }
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const URL: string = "https://breta-api.up.railway.app/graphql";
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
    if (input.length>2 ) {
      setTimeout(async () => {
        const query = `{
          findBy(findByInput: {
            search_input: "${input}"
            type: "salon"
          }){
            full_name
            type
            profile{
              services
              profile_picture
          location

            }
           
          }
        }`;
        const options = {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ query: query }),
        };
        const response = await fetch(URL, options);
        const data = await response.json();
        const result = data.data;
        if (result!=null) {
          setSearchResults([]);
          result.findBy.forEach((result: searchResults) => {
            setSearchResults((searchResults) => [...searchResults, result]);
          });
        } else {
          setSearchResults([]);
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
          className={`absolute ring-1 ring-gray-300 top-10 w-full flex flex-col bg-white rounded-md p-1 backdrop-blur-2xl ${
            searchResults.length == 0 && "hidden"
          }`}
        >
          {searchResults &&
            searchResults.map((result: any, index: number) => {
              return (
                <div key={index} className="">
                  {result.full_name}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
