
// async function to send a query this handle http://gcrsandbox388:2023/process
export async function GetImageFromQuery(query: string, use_gpt: boolean = true) {
    const res = await fetch('http://gcrsandbox388:2024/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, use_gpt }),
    });

    console.log("GetImageFromQuery: " + res.status);

    // check for erorrs and print
    if (!res.ok) {

        console.log("Error in GetImageFromQuery");

        const message = `An error has occured: ${res.status}`;
        console.error(message);

    }

    return await res.json();
}
