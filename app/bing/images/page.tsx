import { loadTSV, tsvToJsonString } from "@/lib/helpers/tsv_loader";
import BingADCard from "./components/Image";
import BingADMultiImgCard from "./components/MultiImageCard";


// types for result from POST query
interface ImageResponse {
    imageb64: string[]; // Assuming that each element of the array is a base64 encoded string
}


// Get Bing images for floral prints
async function getBingStaticImageData() {
    const url = new URL('https://www.bing.com/images/search?q=floral+jacket&qs=n&form=QBILPG&sp=-1&lq=0&pq=floral+jacket&sc=10-13&cvid=60D9B1018E9A43EAA5629A4249E25367&ghsh=0&ghacc=0&first=1&format=pbjson');
    const res = await fetch(url.toString());
    return await res.text();
}

// load local image data
function getLocalImageData() {
    const data = tsvToJsonString('data/ImageCreatorDataSelected.tsv');
    return data;
}

export default async function ImagesPage() {

    // const { imageb64, prompt } = await postQuery("A person wearing a jacket with neomonde prints");
    const imageData = JSON.parse(getLocalImageData());

    return (
        <>
            <div className="flex flex-wrap items-center">
                {imageData.map((image: any, index: number) => {
                    // console.log(index);
                    if (index < 30) return (

                        <BingADMultiImgCard {...image} />)
                })}
            </div>
        </>
    );

}