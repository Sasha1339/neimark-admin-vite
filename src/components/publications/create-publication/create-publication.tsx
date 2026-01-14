import type {FC} from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {PublicationsForm} from "@/components/form/publications-form/publications-form.tsx";
import {createPublicationScheme} from "@/entities/publication.ts";
import type {Publication} from "@/shared/types.ts";

const images = [
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002'
]

type Props = {

}

export const CreatePublication: FC<Props> = ({...props}) => {

  const { control, handleSubmit } = useForm<Publication>({
    resolver: zodResolver(createPublicationScheme),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      date: '', // 2027-02-17T07:00:00.000Z,
      files: undefined
    }
  });

  const onSubmit = (data: Publication) => {
    console.log(data)
  }

  return (
    <PublicationsForm mode={'create'}  control={control} images={images} onPublic={handleSubmit(onSubmit)} />
  )

}