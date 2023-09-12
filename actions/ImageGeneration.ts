'use server';

// async function to send a query this handle http://gcrsandbox388:2023/process
async function GetImageFromQuery(query: string, use_gpt: boolean = true) {
    const res = await fetch('http://gcrsandbox388:2023/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, use_gpt })
    });
    return await res.json();
}

export async function getGeneratedImageForQuery(query: string) {
    const { imageb64, prompt } = await GetImageFromQuery(query, true);
    return { imageb64, prompt };
}