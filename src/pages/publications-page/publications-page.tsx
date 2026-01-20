import {type FC, useEffect} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanelNode} from "@/components/publications/list-panel-node/list-panel-node.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useGetAllPublicationsMutation} from "@/middlewares/publication.ts";
import {useAppSelector} from "@/services/store.ts";
import {publicationSelectors} from "@/services/publication.ts";

type Page = {}

export const PublicationsPage: FC<Page> = ({...props}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [getAllPublications] = useGetAllPublicationsMutation();

  const publications = useAppSelector(publicationSelectors.allPublications);

  useEffect(() => {
    getAllPublications()
  }, []);
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все публикации'}
                 bodyPanel={
                    <ListPanel width={600} isNewButton={true} titleNewButton={'Добавить новую публикацию'} onClickNewButton={() => navigate('/publications/new')}>
                      {publications.map((e, i) => (
                        <ListPanelNode publication={e} key={i} onClick={() => navigate(`/publications/${e.$id}`)} active={location.pathname.includes(e.$id)}/>
                      ))}
                    </ListPanel>
                }>
      <Outlet />
    </ExpandPanel>
  )
  
}