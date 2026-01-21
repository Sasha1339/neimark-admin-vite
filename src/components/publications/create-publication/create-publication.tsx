import {type FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {PublicationsForm} from "@/components/form/publications-form/publications-form.tsx";
import {createPublicationScheme} from "@/entities/publication.ts";
import type {Publication, PublicationForm} from "@/shared/publications/types.ts";
import {useCreatePublicationMutation, useGetAllPublicationsMutation} from "@/middlewares/publication.ts";
import {useNavigate} from "react-router-dom";
import {todayMoreDate, withURLAppwriteStorage} from "@/shared/images/functions.ts";
import {useApiPublicationImage} from "@/shared/images/hooks/useApiPublicationImage.ts";
import {ID} from "appwrite";
import {useAppSelector} from "@/services/store.ts";
import {userSelectors} from "@/services/user.ts";

type Props = {

}

export const CreatePublication: FC<Props> = ({...props}) => {

  const [createPublication, createPublicationResult] = useCreatePublicationMutation();
  const [getAllPublication] = useGetAllPublicationsMutation();
  const navigate = useNavigate();
  const {savedAllImages} = useApiPublicationImage(null);
  const user = useAppSelector(userSelectors.user);


  const { control, handleSubmit } = useForm<PublicationForm>({
    resolver: zodResolver(createPublicationScheme),
    defaultValues: {
      title: '',
      category: undefined,
      content: '',
      gallery_urls: [],
      published_at: '',
      files: undefined
    }
  });

  useEffect(() => {
    if (createPublicationResult.isSuccess && createPublicationResult.data) {
      getAllPublication();
      navigate(`/publications/${createPublicationResult.data.$id}`)
    }
  }, [createPublicationResult]);

  const onSubmit = async (data: PublicationForm) => {
    const publicationId = ID.unique();
    if (data.files && data.files.length > 0) {
      const imagesResponses = await savedAllImages(data.files);
      const imagesUrls = imagesResponses
        .filter((e) => !e.error && e.data !== undefined)
        .map((e) => withURLAppwriteStorage(e.data.$id));
      const { files, ...dataWithoutFiles } = data;
      dataWithoutFiles.status = todayMoreDate(dataWithoutFiles.published_at) ? 'published' : 'unpublished';
      dataWithoutFiles.is_important = false;
      dataWithoutFiles.author_id = user ? user.$id : undefined;
      createPublication({publication: {...dataWithoutFiles, gallery_urls: [...imagesUrls, ...data.gallery_urls], featured_image_url: imagesUrls[0]}, publicationId})
    } else {
      const { files, ...dataWithoutFiles } = data;
      dataWithoutFiles.status = todayMoreDate(dataWithoutFiles.published_at) ? 'published' : 'unpublished';
      dataWithoutFiles.is_important = false;
      dataWithoutFiles.author_id = user ? user.$id : undefined;
      createPublication({publication: dataWithoutFiles, publicationId})
    }
  }

  return (
    <PublicationsForm mode={'create'}  control={control} images={[]} onPublic={handleSubmit(onSubmit)} />
  )

}