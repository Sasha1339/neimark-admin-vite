import {type FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {StudentsForm} from "@/components/form/students-form/students-form.tsx";
import type {Student, StudentForm} from "@/shared/students/types.ts";
import {studentScheme} from "@/entities/students.ts";
import {useNavigate, useParams} from "react-router-dom";
import {
  useDeleteStudentMutation,
  useGetAllStudentsMutation,
  useGetStudentMutation,
  useUpdateStudentFieldsMutation
} from "@/middlewares/student.ts";
import {useAppSelector} from "@/services/store.ts";
import {studentSelectors} from "@/services/student.ts";
import {getFullName} from "@/shared/functions.ts";
import {useGetAllDocumentsByIdMutation} from "@/middlewares/document.ts";

type Props = {

}

export const EditStudent: FC<Props> = ({...props}) => {

  const params = useParams<{ id: string }>();
  const [getStudent] = useGetStudentMutation();
  const [updateStudent, updateStudentResult] = useUpdateStudentFieldsMutation();
  const [getAllDocumentsById] = useGetAllDocumentsByIdMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [getAllStudents] = useGetAllStudentsMutation();
  const navigate = useNavigate();
  const currentStudent = useAppSelector(studentSelectors.currentStudent);
  const studentDocuments = useAppSelector(studentSelectors.studentDocuments);

  const { control, handleSubmit, reset } = useForm<StudentForm>({
    resolver: zodResolver(studentScheme),
    defaultValues: {
      first_name: '',
      last_name: '',
      patronymic: '',
      email: '',
      phone_number: '',
      university: '',
      faculty: '',
      field_of_study: '',
      cohort: '',
      group: '',
      year_of_study: 0,
      building: '',
      room_number: '',
      residence_comment: '',
    }
  });

  useEffect(() => {
    if (params.id) {
      getStudent({studentId: params.id})
      getAllDocumentsById({ profileId: params.id })
    }
  }, [params.id]);

  const resetStudent = (student: Student) => {
    reset({
      first_name: student.first_name,
      last_name: student.last_name,
      patronymic: student.patronymic ?? undefined,
      email: student.email,
      phone_number: student.phone_number,
      university: student.university ?? undefined,
      faculty: student.faculty ?? undefined,
      field_of_study: student.field_of_study ?? undefined,
      cohort: student.cohort ?? undefined,
      group: student.group ?? undefined,
      year_of_study: student.year_of_study ?? undefined,
      building: student.building ?? undefined,
      room_number: student.room_number ?? undefined,
      residence_comment: student.residence_comment ?? undefined,
    })
  }

  useEffect(() => {
    if (updateStudentResult.isError && currentStudent) {
      resetStudent(currentStudent);
    }
  }, [updateStudentResult]);

  useEffect(() => {
    if (currentStudent) {
      resetStudent(currentStudent);
    }
  }, [currentStudent]);

  const onDelete = async () => {
    if (params.id) {
      await deleteStudent({id: params.id});
      navigate('/students');
    }

  }

  const onSubmit = (data: StudentForm) => {
    if (params.id) {
      data.full_name = getFullName(data);
      updateStudent({studentId: params.id, student: data});
    }
  }


  return (
    <StudentsForm mode={'update'} documents={studentDocuments} control={control} onSave={handleSubmit(onSubmit)} onDelete={onDelete} />
  )

}