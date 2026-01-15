import type {FC} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanelNode} from "@/components/publications/list-panel-node/list-panel-node.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {PublicationCategory} from "@/shared/publications/types.ts";

const data = [
  {
    id: '1',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  },
  {
    id: '2',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  },
  {
    id: '3',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  },
  {
    id: '4',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  },
  {
    id: '5',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.NEWS
  },
  {
    id: '6',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  },
  {
    id: '7',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  },
  {
    id: '8',
    title: 'Информатика - язык будущего, на котором мы говорим уже сегодня!',
    date: '2027-02-17T07:00:00.000Z',
    category: PublicationCategory.EVENTS
  }
]



type Page = {}

export const PublicationsPage: FC<Page> = ({...props}) => {

  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все публикации'}
                 bodyPanel={
                    <ListPanel width={600} isNewButton={true} titleNewButton={'Добавить новую публикацию'} onClickNewButton={() => navigate('/publications/new')}>
                      {data.map((e, i) => (
                        <ListPanelNode publication={e} key={i} onClick={() => navigate(`/publications/${e.id}`)} active={location.pathname.includes(e.id)}/>
                      ))}
                    </ListPanel>
                }>
      <Outlet />
    </ExpandPanel>
  )
  
}