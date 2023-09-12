"use client";

import Image from "next/image";

import { getGeneratedImageForQuery } from "@/actions/ImageGeneration";
import { useRouter } from "next/navigation";

export default async function BingLayout({ children }: {
    children: React.ReactNode
}) {

    const router = useRouter();

    return (
        <>
            <div className="flex flex-col items-center min-h-screen py-2">

                {/* Header - Add a search bar with search button */}
                <form className="flex flex-row items-center w-full max-w-screen-2xl" action={async (formData: FormData) => {

                    const {
                        imageb64,
                        prompt
                    } = await getGeneratedImageForQuery(formData.get("search_query") as string)

                    if(imageb64)
                    {
                        router.push(`/bing/images?img_data=${imageb64}&prompt=${prompt}`);
                    }
                }}>
                    <Image className="flex-none" src="/bing.svg" alt="Bing Logo" width={150} height={150} />
                    <input type="text" className="flex grow transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2 w-full" name="search_query" />
                    <button className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-gray-300 rounded-md p-2 m-2" type="submit">Search</button>
                </form>

                {/* filters section */}
                <div className="flex flex-row items-center w-full max-w-screen-2xl">
                    <div className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2">Filter 1</div>
                    <div className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2">Filter 2</div>
                    <div className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2">Filter 3</div>
                    <div className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2">Filter 4</div>
                </div>

                {/* results section */}

                <div className="w-full max-w-screen-2xl">
                    {children}
                </div>

            </div>
        </>
    );

}