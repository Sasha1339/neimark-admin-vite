import {APPWRITE_STORAGE_API_V1_WITH_DOMAIN} from "@/shared/const.ts";

export const withURLAppwriteStorage = (imageId: string) => {
  return `${APPWRITE_STORAGE_API_V1_WITH_DOMAIN}/buckets/news_media/files/${imageId}/view?project=neimark`
}

export const cutId = (url: string) => {
  return url.split('/files/')[1]?.split('/')[0];
}