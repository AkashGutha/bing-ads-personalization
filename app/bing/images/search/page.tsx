import { useRouter } from "next/navigation";

export default function BingImagesSearchPage() {

    const router = useRouter();
    console.log(router.query);

    return (
        <>
            Search page
        </>
    )
}
