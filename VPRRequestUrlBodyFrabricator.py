import sys

urlTemplate = 'https://www.bing.com/images/api/custom/knowledge?q={UserQuery}{hotspot}&rshighlight=true&textDecorations=true&internalFeatures=similarproducts,share&mkt={market}&setLang={language}&IG=BA94ED6070994DD38D47EEFF0A6A9C21&IID=idpins&SFX=1&format=pbxml&FORM={Form}&features=mmnoskey&p1=[AdService AdsMonitorTest="true" CreateDebugAQRs="true" InternalTrafficSource="A8DA38AC40508" PASerializeDebug="true" SerializeDebug="true" IsAggregatorResponseAQREnabled="true" {flightInfo}][AppHost DisableTimeouts="true" WriteAllPluginLogs="True"]'
BodyTemplate_BingImageIndex = '{{"imageInfo": {{"imageInsightsToken": "ccid_{ImageContentId}*mid_{ImageMediaId}*simid_{ImageDocumentId}*thid_{ImageThumbnailId}","url": "{Url}","source": "BingImageIndex"{cropInfo}}},"knowledgeRequest": {{"invokedSkills": ["ImageById","BestRepresentativeQuery","Offline","ObjectDetection","EntityLinkingFace","EntityLinkingDog","EntityLinkingAnimal","EntityLinkingPlant","EntityLinkingLandmark","EntityLinkingFood","RelatedSearches","ShoppingSources","TextAds","ProductAds","SponsoredAds","Recipes","Travel","EntityLinkingBook","SimilarImages","SimilarProducts"],"invokedSkillsRequestData": {{"adsRequest": {{"textRequest": {{"mainlineAdsMaxCount": 2}}}}}},"index": 1}}}}'
BodyTemplate_Gallery = '{{"imageInfo": {{"imageInsightsToken": "bcid_{ImageBlobCacheId}","source": "Gallery"{cropInfo}}},"knowledgeRequest": {{"invokedSkills": ["ImageById","BestRepresentativeQuery","Offline","ObjectDetection","EntityLinkingFace","EntityLinkingDog","EntityLinkingAnimal","EntityLinkingPlant","EntityLinkingLandmark","EntityLinkingFood","RelatedSearches","ShoppingSources","TextAds","ProductAds","SponsoredAds","Recipes","Travel","EntityLinkingBook","SimilarImages","SimilarProducts"],"invokedSkillsRequestData": {{"adsRequest": {{"textRequest": {{"mainlineAdsMaxCount": 2}}}}}},"index": 1}}}}'
BodyTemplate_Url = '{{"imageInfo": {{"url": "{Url}","source": "Url"{cropInfo}}},"knowledgeRequest": {{"invokedSkills": ["ImageById","BestRepresentativeQuery","Offline","ObjectDetection","EntityLinkingFace","EntityLinkingDog","EntityLinkingAnimal","EntityLinkingPlant","EntityLinkingLandmark","EntityLinkingFood","RelatedSearches","ShoppingSources","TextAds","ProductAds","SponsoredAds","Recipes","Travel","EntityLinkingBook","SimilarImages","SimilarProducts"],"invokedSkillsRequestData": {{"adsRequest": {{"textRequest": {{"mainlineAdsMaxCount": 2}}}}}},"index": 1}}}}'

CropTemplate = ',"cropArea": {{"top": "{Top}", "left": "{Left}", "right": "{Right}", "bottom": "{Bottom}"}}'

def GetCropInfo(ImageCropInfo):
    cropInfo = ""
    if ImageCropInfo.strip() != "":
        blocks = ImageCropInfo.split(",")
        #left, top, right, bottom
        cropInfo = CropTemplate.format(Top=blocks[1], Left=blocks[0], Right=blocks[2], Bottom=blocks[3])
    
    return cropInfo

def GetFields(line,headers):
    fields = {"UserQuery":"",
              "market":"en-us",
              "language":"en-us",
              "cropInfo":"",
              "hotspot":"",
              "Form":"IRPRST"
              }
    blocks = line.strip().split("\t")
    for idx,block in enumerate(blocks):
        fields[headers[idx]] = block    
    
    fields["UserQuery"] = fields["UserQuery"].replace(" ", "+")
    if "ImageCropInfo" in fields.keys():
        fields["cropInfo"] = GetCropInfo(fields["ImageCropInfo"])
        if fields["cropInfo"] != "":
            fields["hotspot"] = "&hotspot=1"

    return fields

def FormatUrl(fields,flightInfo):
    url = urlTemplate.format(**fields,flightInfo=flightInfo)
    return url

def ValidKey(fields,key):
    return key in fields.keys() and fields[key]!= ""

def WhatSource(fields):
    source = "Unknown"
    
    if ValidKey(fields, "ImageContentId") and ValidKey(fields, "Url") and ValidKey(fields, "ImageMediaId") and ValidKey(fields, "ImageDocumentId") and ValidKey(fields, "ImageThumbnailId"):
        source = "BingImageIndex"
    elif ValidKey(fields, "Url"):
        source = "Url"
    elif ValidKey(fields, "ImageBlobCacheId"):
        source = "Gallery"
    
    return source
    

def FormatBody(fields):
    
    body = ""
    
    source = WhatSource(fields)
    if source == "Url":
        body = BodyTemplate_Url.format(**fields)
    elif source == "Gallery":
        body = BodyTemplate_Gallery.format(**fields)
    elif source == "BingImageIndex":
        body = BodyTemplate_BingImageIndex.format(**fields)
    
    return body,source

def main():
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    flightInfo = sys.argv[3]    
    output_stat = sys.argv[4]
    
    source_stat = {}
    with open(input_file, "r", encoding = "utf8") as fin:
        with open(output_file, "w", encoding = "utf8") as fout:
            for idx,line in enumerate(fin):
                if idx == 0:
                    headers = line.strip().split("\t")   
                    continue
                fields = GetFields(line,headers)                
                body,source = FormatBody(fields)
                if source == "Url" or source == "Gallery":
                    fields["Form"] = "SBIIDP"
                url = FormatUrl(fields,flightInfo)
                if source in source_stat.keys():
                    source_stat[source] += 1
                else:
                    source_stat[source] = 1
                    
                if source not in {"BingImageIndex", "Gallery", "Url"}:
                    continue
                outline = fields["RGUID"] + "\t" + fields["OfferId"] + "\t" + url + "\t" + body + "\n"
                fout.write(outline)
    
    with open(output_stat, "w", encoding = "utf8") as fstat:
        cnts = [v for k,v in source_stat.items()]
        allCnt = sum(cnts)
        fstat.write("souce\tcnt\tratio\n")
        fstat.write("All\t{}\t1.0\n".format(allCnt))
        for k, v in source_stat.items():
            outline = k + "\t" + str(v) + "\t" + str(v/allCnt) + "\n"
            fstat.write(outline)

if __name__ == "__main__":
    main()