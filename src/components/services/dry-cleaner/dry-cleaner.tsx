import {type FC, useEffect, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ListPanelNode} from "@/components/services/shared/list-panel-node/list-panel-node.tsx";

const links = [
  {
    id: '1',
    building: 10,
    number: 12,
    status: 'Назначено',
    date: '2027-02-17T07:00:00.000Z'
  },
  {
    id: '1',
    building: 10,
    number: 12,
    status: 'Назначено',
    date: '2027-02-17T07:00:00.000Z'
  },
  {
    id: '1',
    building: 10,
    number: 12,
    status: 'Назначено',
    date: '2027-02-17T07:00:00.000Z'
  }
];

type Page = {}

export const DryCleaner: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <ExpandPanel expandWidth={650} headerTitle={'Химчистка'}
                 bodyPanel={
                   <ListPanel isSearching={true} onSearchChange={(e) => setSearch(e)} width={400} placeholder={'Поиск заявки'}>
                     {links.map((e, i) => (
                       <ListPanelNode key={i} active={location.pathname.includes(e.id)} room={e} onSelect={() => navigate(`/services/dry-cleaner/${e.id}`)}/>
                     ))}
                   </ListPanel>
                 }>
      <Outlet />
    </ExpandPanel>
  )

}