import {type FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {PublicationsForm} from "@/components/form/publications-form/publications-form.tsx";
import {updatePublicationScheme} from "@/entities/publication.ts";
import {type PublicationForm} from "@/shared/publications/types.ts";
import {useAppSelector} from "@/services/store.ts";
import {publicationSelectors} from "@/services/publication.ts";
import {useParams} from "react-router-dom";
import {
  useGetAllPublicationsMutation,
  useGetPublicationMutation,
  useUpdatePublicationFieldsMutation
} from "@/middlewares/publication.ts";

import {withURLAppwriteStorage} from "@/shared/images/functions.ts";
import {useApiPublicationImage} from "@/shared/images/hooks/useApiPublicationImage.ts";

type Props = {}

export const EditPublication: FC<Props> = ({...props}) => {

  const params = useParams<{ id: string }>();
  const [getPublication] = useGetPublicationMutation();
  const [getAllPublication] = useGetAllPublicationsMutation();
  const [updatePublicationFields, updatePublicationsFieldsResult] = useUpdatePublicationFieldsMutation();
  const currentPublication = useAppSelector(publicationSelectors.currentPublication);
  const {savedAllImages, deleteSelectedPublicationImage} = useApiPublicationImage(currentPublication);

  const {control, handleSubmit, reset} = useForm<PublicationForm>({
    resolver: zodResolver(updatePublicationScheme),
    defaultValues: {
      title: '',
      category: undefined,
      content: '',
      files: undefined,
      published_at: undefined
    }
  });

  useEffect(() => {
    if (params.id) {
      getPublication({publicationId: params.id})
    }
  }, [params.id]);

  useEffect(() => {
    if (currentPublication) {
      reset(currentPublication)
    }
  }, [currentPublication]);

  useEffect(() => {
    if (updatePublicationsFieldsResult.isError && currentPublication) {
      reset(currentPublication)
    } else if (updatePublicationsFieldsResult.isSuccess) {
      getAllPublication();
    }
  }, [updatePublicationsFieldsResult]);

  const onDelete = (id: string) => {
    deleteSelectedPublicationImage(id);
  }

  const onSubmit = async (data: PublicationForm) => {
    if (params.id) {
      if (data.files && data.files.length > 0) {
        const imagesResponses = await savedAllImages(data.files);
        const imagesUrls = imagesResponses
          .filter((e) => !e.error && e.data !== undefined)
          .map((e) => withURLAppwriteStorage(e.data.$id));
        const { files, ...dataWithoutFiles } = data;
        updatePublicationFields({
          publicationId: params.id,
          publication: {...dataWithoutFiles, gallery_urls: [...imagesUrls, ...data.gallery_urls], featured_image_url: imagesUrls[0]}
        });
      } else {
        const { files, ...dataWithoutFiles } = data;
        updatePublicationFields({publicationId: params.id, publication: dataWithoutFiles});
      }

    }
  }

  return (
    <PublicationsForm mode={'update'} control={control} images={currentPublication?.gallery_urls ?? []}
                      onPublic={handleSubmit(onSubmit)} onDeleteImage={onDelete}/>
  )

}