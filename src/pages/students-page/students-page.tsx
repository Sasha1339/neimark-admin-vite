import {type FC, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {PublicationsForm} from "@/components/form/publications-form/publications-form.tsx";
import {useForm} from "react-hook-form";
import {ListPanelNode} from "@/components/students/list-panel-node/list-panel-node.tsx";
import {StudentsForm} from "@/components/form/students-form/students-form.tsx";
import {CreateStudent} from "@/components/students/create-student/create-student.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

const data = [
  {
    id: '1',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '2',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '3',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '4',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '5',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '6',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '7',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '8',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '9',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '10',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    id: '11',
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  }
];

type Page = {}

export const StudentsPage: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const filterStudents = (e: {name: string, description: string}) => {
    const searchCase = search.toLowerCase();
    const nameCase = e.name.toLowerCase();
    const descriptionCase = e.description.toLowerCase();
    return searchCase.includes(nameCase) || searchCase.includes(descriptionCase) || searchCase === '' || nameCase.includes(searchCase) || descriptionCase.includes(searchCase);
  }
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Студенты'}
                 bodyPanel={
                    <ListPanel isSearching={true} onSearchChange={(e) => setSearch(e)} width={400} onClickNewButton={() => navigate(`/students/new`)} isNewButton={true} titleNewButton={'Добавить студента'}>
                      {data.filter(filterStudents).map((e, i) => (
                        <ListPanelNode name={e.name} active={location.pathname.includes(e.id)} description={e.description} key={i} onSelect={() => navigate(`/students/${e.id}`)}/>
                      ))}
                    </ListPanel>
                }>
    <Outlet />
    </ExpandPanel>
  )
  
}