export default async function GetVisuallySimilarProductAds(prompt: string, generated_img_url: string) {

    const jsonBody = JSON.stringify({
        imageInfo: {
            url: `${encodeURI(generated_img_url)}`,
            source: "Url"
        },
        knowledgeRequest: {
            invokedSkills: [
                "ProductAds"
            ],
            invokedSkillsRequestData: {
                adsRequest: {
                    textRequest: {
                        mainlineAdsMaxCount: 2
                    }
                }
            }
        }
    })

    const knowledge = await fetch(`https://www.bing.com/images/api/custom/knowledge?q=${encodeURIComponent(prompt)}&rshighlight=true&textDecorations=true&internalFeatures=similarproducts,share&skey=Ps1Nufs69gSunRbpJ-mzW2McLqxPUaFTp3r6OAh9CGU&safeSearch=Moderate&mkt=en-us&setLang=en-us&IG=E0B3BE3810A941C295CB14210C488053&IID=idpins&SFX=1&p1=[AdService%20PASerializeDebug=%22true%22%20SerializeDebug=%22true%22][AppHost%20WriteAllPluginLogs=%22true%22][SimilarImagesRequest%20Offset=%220%22%20Count=%22100%22]&debug=1&features=enablepapre,idppalog,enablerplog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'private,private, no-store, must-revalidate, no-cache',

        },
        body: `
            ------WebKitFormBoundarysRvH8BnnHWg37TPb
            Content-Disposition: form-data; name="knowledgeRequest"

            {"imageInfo":{"url":"http://c8.alamy.com/comp/CETK94/cropped-female-feet-wearing-pale-nail-polish-on-toenails-and-black-CETK94.jpg","source":"Url"},"knowledgeRequest":{"invokedSkills":["ProductAds"],"invokedSkillsRequestData":{"adsRequest":{"textRequest":{"mainlineAdsMaxCount":2}}}}}

            ------WebKitFormBoundarysRvH8BnnHWg37TPb--
`
    }
    );

    console.log(knowledge.headers);

    if (!knowledge.ok) throw new Error(`Failed to get visually similar product ads for ${prompt}`);

    return await knowledge.json();
}
