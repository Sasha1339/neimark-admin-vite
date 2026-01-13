import type {FC} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanelNode} from "@/components/publications/list-panel-node/list-panel-node.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {InputEditor} from "@/components/shared/input-editor/input-editor.tsx";
import {PublicationsForm} from "@/components/form/publications-form/publications-form.tsx";
import {useForm} from "react-hook-form";

const data = [
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  },
  {
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '21.08.25',
    type: 'События'
  }
]

const images = [
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002',
  '746fdd4f-af3d-4203-95d7-63f15b000002'
]

type Page = {}

export const PublicationsPage: FC<Page> = ({...props}) => {

  const { control, handleSubmit } = useForm({
    defaultValues: {
        title: '',
        category: '',
        description: '',
        date: '', // 2027-02-17T07:00:00.000Z,
        files: []
    }
  });
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все публикации'}
                 bodyPanel={
                    <ListPanel width={600}>
                      {data.map((e, i) => (
                        <ListPanelNode title={e.title} date={e.date} type={e.type} key={i} />
                      ))}
                    </ListPanel>
                }>
    <PublicationsForm mode={'create'} control={control} images={images} />
    </ExpandPanel>
  )
  
}