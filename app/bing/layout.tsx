"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BingLayout({ children }: {
    children: React.ReactNode
}) {

    const router = useRouter();
    const [searchQueryHistory, setSearchQueryHistory] = useState([""]);

    return (
        <>
            <div className="flex flex-col items-center min-h-screen py-2">

                {/* Header - Add a search bar with search button */}
                <form className="flex flex-row items-center w-full max-w-screen-2xl" action={(formData: FormData) => {
                    const prompt = formData.get("search_query") as string;
                    setSearchQueryHistory([...searchQueryHistory, prompt]);
                    if (prompt) {
                        router.push(`/bing/images/search?prompt=${encodeURIComponent(prompt)}`);
                    }
                    formData.delete("search_query");
                }}>
                    <Image className="flex-none" src="/bing.svg" alt="Bing Logo" width={150} height={150} />
                    <input type="text" className="flex grow transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2 w-full" name="search_query" />
                    <button className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-gray-300 rounded-md p-2 m-2" type="submit">Search</button>
                </form>

                {/* filters section */}
                <div className="flex flex-row items-center w-full max-w-screen-2xl">
                    {searchQueryHistory.map((query) => {
                        if (query !== "") {
                            return (
                                <Link key={query} className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-blue-100 rounded-md p-2 m-2" href={`/bing/images/search?prompt=${encodeURIComponent(query)}`}>{query}</Link>
                            )
                        }
                    })
                    }
                </div>

                {/* results section */}

                <div className="w-full max-w-screen-2xl">
                    {children}
                </div>

            </div>
        </>
    );

}