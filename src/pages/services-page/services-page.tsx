import {type FC, useEffect, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {ListPanelNode} from "@/components/services/list-panel-node/list-panel-node.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

const links = [
  {
    title: 'Клининг',
    url: 'cleaning'
  },
  {
    title: 'Смена белья',
    url: 'linen'
  },
  {
    title: 'Вызов мастера',
    url: 'master'
  },
  {
    title: 'Стирка',
    url: 'laundry'
  },
  {
    title: 'Химчистка',
    url: 'dry-cleaner'
  }
];

type Page = {}

export const ServicesPage: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все услуги'}
                 bodyPanel={
                   <ListPanel onSearchChange={(e) => setSearch(e)} width={400}>
                     {links.map((e, i) => (
                       <ListPanelNode active={location.pathname.includes(e.url)} key={i} link={e} onSelect={() => navigate(`/services/${e.url}`)}/>
                     ))}
                   </ListPanel>
                 }>
      {/*{documentId && <DocumentsViewer src={withUrlDocuments(documentId)} />}*/}
      <Outlet />
    </ExpandPanel>
  )

}