import {APPWRITE_STORAGE_API_V1_WITH_DOMAIN} from "@/shared/const.ts";

export const withURLAppwriteStorage = (imageId: string) => {
  return `${APPWRITE_STORAGE_API_V1_WITH_DOMAIN}/buckets/news_media/files/${imageId}/view?project=neimark`
}

export const cutId = (url: string) => {
  return url.split('/files/')[1]?.split('/')[0];
}

export const todayMoreDate = (date: string) => {
  const today = new Date();
  today.setHours(8, 0, 0, 0);
  const chosenDate = new Date(date);
  const dateTimestamp = Date.UTC(
    chosenDate.getFullYear(),
    chosenDate.getMonth(),
    chosenDate.getDate()
  );

  const todayTimestamp = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return todayTimestamp > dateTimestamp;

}