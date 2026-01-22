import {type FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {StudentsForm} from "@/components/form/students-form/students-form.tsx";
import {ResidentType, Role, type StudentForm} from "@/shared/students/types.ts";
import {studentScheme} from "@/entities/students.ts";
import {useCreateStudentMutation, useGetAllStudentsMutation} from "@/middlewares/student.ts";
import {useNavigate} from "react-router-dom";
import {ID} from "appwrite";
import {getFullName} from "@/shared/functions.ts";

type Props = {}

export const CreateStudent: FC<Props> = ({...props}) => {

  const [createStudent, createStudentResult] = useCreateStudentMutation();
  const [getAllStudents] = useGetAllStudentsMutation();
  const navigate = useNavigate();


  const {control, handleSubmit} = useForm<StudentForm>({
    resolver: zodResolver(studentScheme),
    defaultValues: {
      first_name: '',
      last_name: '',
      patronymic: undefined,
      email: '',
      phone_number: '',
      university: '',
      faculty: '',
      field_of_study: '',
      cohort: undefined,
      group: '',
      year_of_study: 0,
      building: '',
      room_number: '',
      residence_comment: undefined,
    }
  });

  useEffect(() => {
    if (createStudentResult.isSuccess && createStudentResult.data) {
      getAllStudents();
      navigate(`/students/${createStudentResult.data.$id}`)
    }
  }, [createStudentResult]);

  const onSubmit = (data: StudentForm) => {
    const studentId = ID.unique();
    data.is_admin = false;
    data.user_role = Role.STUDENT;
    data.resident_type = ResidentType.STUDENT;
    data.full_name = getFullName(data);
    createStudent({student: data, studentId})
  }

  return (
    <StudentsForm mode={'create'} control={control} onSave={handleSubmit(onSubmit)}/>
  )

}