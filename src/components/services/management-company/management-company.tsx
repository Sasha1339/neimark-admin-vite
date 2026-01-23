import {type FC, useEffect, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {ListPanelNode} from "@/components/services/shared/list-panel-node/list-panel-node.tsx";
import {useAppSelector} from "@/services/store.ts";
import {serviceSelectors} from "@/services/service.ts";
import {useGetAllServicesByTypeMutation} from "@/middlewares/service.ts";
import {ServiceType} from "@/shared/services/types.ts";
import styles from "./management-company.module.css";

type Page = {}

export const ManagementCompany: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const location = useLocation();
  const services = useAppSelector(serviceSelectors.allServices);
  const [getAllServices] = useGetAllServicesByTypeMutation();

  useEffect(() => {
    getAllServices({type: ServiceType.MANAGEMENT_COMPANY})
  }, []);


  return (
    <ExpandPanel expandWidth={650} headerTitle={'Вызов мастера'}
                 bodyPanel={
                   <ListPanel isSearching={true} onSearchChange={(e) => setSearch(e)} width={400}
                              placeholder={'Поиск заявки'}>
                     {services.map((e, i) => (
                       <Link key={e.$id} to={`/services/management-company/${e.chat_id}`} className={styles.link}>
                         <ListPanelNode key={i} active={location.pathname.includes(e.chat_id)} service={e}/>
                       </Link>
                     ))}
                   </ListPanel>
                 }>
      <Outlet/>
    </ExpandPanel>
  )

}