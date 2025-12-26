import type {FC} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanelNode} from "@/components/publications/list-panel-node/list-panel-node.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";

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

type Page = {}

export const PublicationsPage: FC<Page> = ({...props}) => {
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все публикации'}
                 bodyPanel={
                    <ListPanel>
                      {data.map((e, i) => (
                        <ListPanelNode title={e.title} date={e.date} type={e.type} key={i} />
                      ))}
                    </ListPanel>
                }>

    </ExpandPanel>
  )
  
}