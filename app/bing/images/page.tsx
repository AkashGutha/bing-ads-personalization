import { loadTSV, tsvToJsonString } from "@/lib/helpers/tsv_loader";
import BingADCard from "./components/Image";
import BingADMultiImgCard from "./components/MultiImageCard";

// types for result from POST query
interface ImageResponse {
    imageb64: string[]; // Assuming that each element of the array is a base64 encoded string
}

// load local image data
function getLocalImageData() {
    const data = tsvToJsonString('data/ImageCreatorDataSelected.tsv');
    return data;
}

export default async function ImagesPage() {

    const imageData = JSON.parse(getLocalImageData());

    return (
        <>
            <div className="flex flex-wrap items-center">
                {imageData.map((image: any, index: number) => {
                    if (index < 30) return (
                        <BingADMultiImgCard {...image} />)
                })}
            </div>
        </>
    );

}