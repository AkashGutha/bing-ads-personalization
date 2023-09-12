import Image from "next/image";

export default async function BingLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
            <div className="flex flex-col items-center min-h-screen py-2">

                {/* Header - Add a search bar with search button */}
                <div className="flex flex-row items-center w-full max-w-screen-2xl">
                    <Image className="flex-none" src="/bing.svg" alt="Bing Logo" width={150} height={150} />
                    <input type="text" className="flex grow transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 rounded-md p-2 m-2 w-full" />
                    <button className="flex-none transition duration-300 ease-in border border-gray-300 border hover:border-gray-600 hover:bg-gray-300 rounded-md p-2 m-2">Search</button>
                </div>

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