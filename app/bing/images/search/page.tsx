import GetVisuallySimilarProductAds from "@/actions/GetVisuallySimilarProductAds";
import { GetImageFromQuery } from "@/actions/ImageGeneration";
import { image } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function BingImagesSearchPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    console.log("search started for " + searchParams.prompt + "")

    const user_prompt = searchParams.prompt as string;
    const res = await GetImageFromQuery(user_prompt);
    const {
        imageb64,
        prompt,
        imageurls
    } = res;

    const query = {
        prompt: user_prompt,
        gpt_prompt: prompt,
        prompt_type: "text",
        imageurl: imageurls[0],
    }

    console.log("Image generated for " + user_prompt + "")
    console.log(res);

    return (
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
            }}>{"Visual Search"}</Link>
            <Link className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-blue-100 rounded-md p-2 m-2" href={{
                pathname: `/bing/images/search/details`,
                query: { ...query, nav_type: "gpt text search" }
            }}>{"GPT Text search"}</Link>

            <div className="flex flex-col items-center min-h-screen py-4">
                <iframe src={`https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIIDP&sbisrc=UrlPaste&q=imgurl:${encodeURIComponent(imageurls[0] as string)}&idpbck=1&selectedindex=0`} className="w-full h-[1200px]"></iframe>
            </div>
        </div>
    )
}
