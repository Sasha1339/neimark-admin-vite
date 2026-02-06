import {type FC, useEffect, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {ListPanelNode} from "@/components/services/list-panel-node/list-panel-node.tsx";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import styles from './services-page.module.css';
import {useMediaQuery} from "@/shared/hooks/useMobileVersion.ts";

const links = [
  {
    title: 'Клининг',
    url: 'cleaning'
  },
  // {
  //   title: 'Смена белья',
  //   url: 'linen'
  // },
  {
    title: 'Вызов мастера',
    url: 'master'
  },
  // {
  //   title: 'Стирка',
  //   url: 'laundry'
  // },
  // {
  //   title: 'Химчистка',
  //   url: 'dry-cleaner'
  // },
  {
    title: 'Управляющая компания',
    url: 'management-company'
  }
];

type Page = {}

export const ServicesPage: FC<Page> = ({...props}) => {

  const { isMobile } = useMediaQuery('(width <= 1600px)')

  const [search, setSearch] = useState('');
  const location = useLocation();


  return (
    <ExpandPanel headerTitle={'Все услуги'}
                 bodyPanel={
                   <ListPanel onSearchChange={(e) => setSearch(e)} width={isMobile ? 300 : 400}>
                     {links.map((e, i) => (
                       <Link  key={i} to={`/services/${e.url}`} className={styles.link}>
                         <ListPanelNode active={location.pathname.includes(e.url)} link={e}/>
                       </Link>
                     ))}
                   </ListPanel>
                 }>
      <Outlet />
    </ExpandPanel>
  )

}