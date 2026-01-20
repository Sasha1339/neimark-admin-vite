import {useDeletePublicationImageMutation, useSavePublicationImageMutation} from "@/middlewares/image.ts";
import {ID} from "appwrite";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";
import type {ImageResponse} from "@/shared/images/types.ts";
import type {Publication, PublicationForm} from "@/shared/publications/types.ts";
import {useUpdatePublicationFieldsMutation} from "@/middlewares/publication.ts";

export const useApiPublicationImage = (currentPublication: Publication | null) => {

  const [saveImage] = useSavePublicationImageMutation();
  const [deletePublicationImage] = useDeletePublicationImageMutation();
  const [updatePublicationFields] = useUpdatePublicationFieldsMutation();

  const deleteSelectedPublicationImage = (id: string) => {
    deletePublicationImage({fileId: id}).then((e) => {
      if (!e.error && currentPublication)  {

        const updatedImages = currentPublication.gallery_urls.filter((e) => !e.includes(id))

        const publication = {
          title: currentPublication.title,
          category: currentPublication.category,
          content: currentPublication.content,
          published_at: currentPublication.published_at,
          gallery_urls: updatedImages,
          featured_image_url: updatedImages[0] ? updatedImages[0] : undefined,
        } as PublicationForm;

        updatePublicationFields({publicationId: currentPublication.$id, publication});
      }
    });
  }

  const savedAllImages = async (files: FileList):
    Promise<(
      {
        data: ImageResponse;
        error?: undefined;
      } | {
      data?: undefined;
      error: FetchBaseQueryError | SerializedError;
    })[]> => {

    return Promise.allSettled(
      Array.from(files)
        .map((file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileId", ID.unique());
          return saveImage(formData);
        })
    )
      .then((result) => {
        return result.filter((e) => e.status === 'fulfilled').map((e) => e.value);
      });

  }

  return { savedAllImages, deleteSelectedPublicationImage };

}