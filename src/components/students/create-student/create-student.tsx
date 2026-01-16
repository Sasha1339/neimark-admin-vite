import type {FC} from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {StudentsForm} from "@/components/form/students-form/students-form.tsx";
import type {Student} from "@/shared/students/types.ts";
import {studentScheme} from "@/entities/students.ts";

type Props = {

}

export const CreateStudent: FC<Props> = ({...props}) => {

  const { control, handleSubmit } = useForm<Student>({
    resolver: zodResolver(studentScheme),
    defaultValues: {
      firstname: '',
      lastname: '',
      patronymic: undefined,
      email: '',
      phone: '',
      university: '',
      faculty: '',
      direction: '',
      stream: '',
      group: '',
      course: '',
      building: '',
      room: '',
      additionally: '',
    }
  });

  const onSubmit = (data: Student) => {
    console.log(data)
  }

  return (
    <StudentsForm mode={'create'}  control={control} onSave={handleSubmit(onSubmit)} />
  )

}