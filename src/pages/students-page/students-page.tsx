import {type FC, useEffect, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {ListPanelNode} from "@/components/students/list-panel-node/list-panel-node.tsx";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useGetAllStudentsMutation, useGetAllStudentsWithPaginationMutation} from "@/middlewares/student.ts";
import {useAppSelector} from "@/services/store.ts";
import {studentSelectors} from "@/services/student.ts";
import type {Student} from "@/shared/students/types.ts";
import {getFullName, splitByNonLetters} from "@/shared/functions.ts";
import styles from './students-page.module.css';

type Page = {}

export const StudentsPage: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [getAllStudents] = useGetAllStudentsMutation();
  const [getAllStudentsWithPagination] = useGetAllStudentsWithPaginationMutation();
  const students = useAppSelector(studentSelectors.allStudents);
  const total = useAppSelector(studentSelectors.total);

  const filterStudents = (e: Student) => {
    const searchCase = splitByNonLetters(search !== null ? search.toLowerCase() : '');
    const firstNameCase = e.first_name ? e.first_name.toLowerCase() : '';
    const secondNameCase = e.last_name ? e.last_name.toLowerCase() : '';
    const patronymicCase = e.patronymic? e.patronymic.toLowerCase() : '';
    const groupCase = e.group ? e.group.toLowerCase() : '';
    const universityCase = e.university ? e.university.toLowerCase() : '';

    const description = `${firstNameCase} ${secondNameCase} ${patronymicCase} ${groupCase} ${universityCase}`;

    return searchCase.length === 0 || searchCase.every((e) => description.includes(e));
  }

  useEffect(() => {
    getAllStudents()
  }, []);

  const onUploadYet = () => {
    getAllStudentsWithPagination({offset: students.length})
  }
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Студенты'}
                 bodyPanel={
                    <ListPanel isSearching={true} onUploadYet={onUploadYet} uploadYetButtonShow={total > students.length} onSearchChange={(e) => setSearch(e)} width={400} onClickNewButton={() => navigate(`/students/new`)} isNewButton={true} titleNewButton={'Добавить студента'}>
                      {students.filter(filterStudents).map((e) => (
                        <Link  key={e.$id} to={`/students/${e.$id}`} className={styles.link}>
                          <ListPanelNode name={e.full_name ?? getFullName(e)} active={location.pathname.includes(e.$id)} description={`${e.group ? e.group + ',' : '<группа не задана>,'} ${e.university ?? '<университет не задан>'}`}/>
                        </Link>
                      ))}
                    </ListPanel>
                }>
    <Outlet />
    </ExpandPanel>
  )
  
}