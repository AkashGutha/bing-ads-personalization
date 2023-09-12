import Image from "next/image";

export default function BingADMultiImgCard({
    RequestCaption,
    THURL_1,
    THURL_2,
    THURL_3,
    THURL_4 }: {
        RequestCaption: string,
        THURL_1: string,
        THURL_2: string,
        THURL_3: string,
        THURL_4: string
    }) {


    if (THURL_1 === undefined || THURL_2 === undefined || THURL_3 === undefined || THURL_4 === undefined) {
        console.log({ RequestCaption, THURL_1, THURL_2, THURL_3, THURL_4 });
        return <></>;
    }

    return (
        // Make a rounded card with the image, title, description, and link with shadows
        <div className="flex flex-col m-1 border border-gray-300 rounded-md shadow-md w-1/5 min-w-[250px] h-[350px]">
            <div className="grid grid-cols-2">
                {/* Image 1 */}
                <div className="relative">
                    <Image width={150} height={150} src={`${THURL_1}`} alt="Base64 Image" />
                </div>
                {/* Image 2 */}
                <div className="relative">
                    <Image width={150} height={150} src={`${THURL_2}`} alt="Base64 Image" />
                </div>
                {/* Image 3 */}
                <div className="relative">
                    <Image width={150} height={150} src={`${THURL_3}`} alt="Base64 Image" />
                </div>
                {/* Image 4 */}
                <div className="relative">
                    <Image width={150} height={150} src={`${THURL_4}`} alt="Base64 Image" />
                </div>
            </div>
            <div className="p-4">
                <p className="truncate">{RequestCaption.trim()}</p>
            </div>
        </div>
    )
}
