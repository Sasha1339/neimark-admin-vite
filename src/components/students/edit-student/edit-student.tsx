import type {FC} from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {StudentsForm} from "@/components/form/students-form/students-form.tsx";
import type {Student} from "@/shared/students/types.ts";
import {studentScheme} from "@/entities/students.ts";

type Props = {

}

export const EditStudent: FC<Props> = ({...props}) => {

  const { control, handleSubmit } = useForm<Student>({
    resolver: zodResolver(studentScheme),
    defaultValues: {
      firstname: 'Александрина',
      lastname: 'Алексеева',
      patronymic: 'Александоровна',
      email: 'email@r.ru',
      phone: '78008008888',
      university: 'НИУ МЭИ',
      faculty: 'ИРЭ',
      direction: '123',
      stream: '-',
      group: '13',
      course: '2',
      building: '1',
      room: '201',
      additionally: '',
    }
  });

  const onSubmit = (data: Student) => {
    console.log(data)
  }

  return (
    <StudentsForm mode={'create'} control={control} onSave={handleSubmit(onSubmit)} />
  )

}