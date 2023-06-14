"use client";
import { useState } from "react";
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
  const URL: string = "https://breta-api.up.railway.app/graphql";
  const headers = {
    "content-type": "application/json",
  };

  const handleSearch = async (input: String) => {
    if (input != "") {
      setTimeout(async () => {
        const query = `{
                      findByName(name: "${input}")
                      {
                          full_name
                          type
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
        if (result) {
          console.log(result);
          setSearchResults([]); //Fix not stacking results
          result.findByName.forEach((result: searchResults) => {
            setSearchResults([...searchResults, result]);
          });
        } else {
          setSearchResults([]);
        }
        console.log(searchResults);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className="relative">
        <input onChange={(e) => handleSearch(e.target.value)} />
        <div className="absolute top-10 w-full flex flex-col">
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
