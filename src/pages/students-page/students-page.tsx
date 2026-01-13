import {type FC, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {PublicationsForm} from "@/components/form/publications-form/publications-form.tsx";
import {useForm} from "react-hook-form";
import {ListPanelNode} from "@/components/students/list-panel-node/list-panel-node.tsx";
import {StudentsForm} from "@/components/form/students-form/students-form.tsx";

const data = [
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  },
  {
    name: 'Алексеева Александрина Александоровна',
    description: 'группа 13, Информационные технологии',
  }
];

type Page = {}

export const StudentsPage: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('')

  const { control, handleSubmit } = useForm({
    defaultValues: {
        firstname: '',
        lastname: '',
        patronymic: '',
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

  const filterStudents = (e: {name: string, description: string}) => {
    return search.includes(e.name) || search.includes(e.description) || search === '';
  }
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все публикации'}
                 bodyPanel={
                    <ListPanel isSearching={true} onSearchChange={(e) => setSearch(e)} width={400} isNewButton={true} titleNewButton={'Добавить студента'}>
                      {data.filter(filterStudents).map((e, i) => (
                        <ListPanelNode name={e.name} description={e.description} key={i} />
                      ))}
                    </ListPanel>
                }>
    <StudentsForm mode={'create'} control={control} />
    </ExpandPanel>
  )
  
}