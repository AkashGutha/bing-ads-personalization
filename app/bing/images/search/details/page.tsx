"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DetailsPage() {

    const search = useSearchParams();
    const prompt = search.get("prompt");
    const gpt_prompt = search.get("gpt_prompt");
    const prompt_type = search.get("prompt_type");
    const imageurl = search.get("imageurl");
    const nav_type = search.get("nav_type");

    console.log(prompt);
    console.log(gpt_prompt);
    console.log(prompt_type);
    console.log(imageurl);
    console.log(nav_type);

    const query = {
        prompt: prompt,
        gpt_prompt: gpt_prompt,
        prompt_type: "text",
        imageurl: imageurl,
    }

    return (
        <>
            <div className="mt-4">
                {/* create tabs */}
                <Link className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-blue-100 rounded-md p-2 m-2" href={{
                    pathname: `/bing/images/search/details`,
                    query: { ...query, nav_type: "details" }
                }}>{"Generated Image"}</Link>
                <Link className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-blue-100 rounded-md p-2 m-2" href={{
                    pathname: `/bing/images/search/details`,
                    query: { ...query, nav_type: "text" }
                }}>{"Text only search"}</Link>
                <Link className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-blue-100 rounded-md p-2 m-2" href={{
                    pathname: `/bing/images/search/details`,
                    query: { ...query, nav_type: "visual" }
                }}>{"Visual search"}</Link>
                {/* <Link className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-blue-100 rounded-md p-2 m-2" href={{
                    pathname: `/bing/images/search/details`,
                    query: { ...query, nav_type: "gpt text search" }
                }}>{"GPT Text search"}</Link> */}
            </div>

            {(nav_type === "details") && (
                <div className="flex flex-col items-center min-h-screen py-8">
                    <h1 className="text-2xl font-bold"> Image generated for {prompt}</h1>
                    <p> GPT prompt: {gpt_prompt} </p>
                    <Image width={1000} height={1000} src={imageurl as string} alt="Base64 Image" className="mt-8" />
                </div>)}

            {(nav_type === "text") && (<>
                <div className="flex flex-col items-center min-h-screen py-4">
                    <iframe src={`https://www.bing.com/images/search?q=${encodeURIComponent(prompt as string)}`} className="w-full h-[1200px]"></iframe>
                </div>
            </>)}

            {(nav_type === "visual") && (<>
                <div className="flex flex-col items-center min-h-screen py-4">
                    <iframe src={`https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIIDP&sbisrc=UrlPaste&q=imgurl:${encodeURIComponent(imageurl as string)}`} className="w-full h-[1200px]"></iframe>
                </div>
            </>)}

            {(nav_type === "gpt text search") && (<>
                <div className="flex flex-col items-center min-h-screen py-4">
                    <iframe src={`https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=${encodeURIComponent(gpt_prompt as string)}`} className="w-full h-[1200px]"></iframe>
                </div>
            </>)}

        </>
    )
};
