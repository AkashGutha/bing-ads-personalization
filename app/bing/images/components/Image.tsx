import Image from "next/image";

export default function BingADCard({
    imageString,
    title,
    description,
    link,
    linkText
}: {
    imageString: string,
    title: string,
    description: string,
    link: string,
    linkText: string
}){

    return(
        // Make a rounded card with the image, title, description, and link with shadows
        <div className="flex flex-col items-center justify-center p-4 m-4 border border-gray-300 rounded-md shadow-md">
            <Image width={200} height={200} src={`data:image/png;base64,${imageString}`} alt="Base64 Image" />
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-xl">{description}</p>
            <a href={link} className="text-blue-500">{linkText}</a>
        </div>
    )

}