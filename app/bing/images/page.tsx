import BingADCard from "./components/Image";


// types for result from POST query
interface ImageResponse {
    imageb64: string[]; // Assuming that each element of the array is a base64 encoded string
}

// async function to send a query this handle http://gcrsandbox388:2023/process
async function postQuery(query: string, use_gpt: boolean = true) {
    const res = await fetch('http://gcrsandbox388:2023/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, use_gpt })
    });
    return await res.json();
}

// Get Bing images for floral prints
async function getBingStaticImageData() {
    const url = new URL('https://www.bing.com/images/search?q=floral+jacket&qs=n&form=QBILPG&sp=-1&lq=0&pq=floral+jacket&sc=10-13&cvid=60D9B1018E9A43EAA5629A4249E25367&ghsh=0&ghacc=0&first=1&format=pbjson');
    const res = await fetch(url.toString());
    return await res.text();
}


export default async function ImagesPage() {

    const { imageb64, prompt } = await postQuery("A person wearing a jacket with neomonde prints");

    return (
        <>
            <div className="flex ">
                <BingADCard imageString={imageb64[0]} title="Title" description={prompt} link="https://www.google.com" linkText="Link" />
            </div>
        </>
    );

}