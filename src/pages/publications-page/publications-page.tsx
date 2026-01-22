import {type FC, useEffect} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanelNode} from "@/components/publications/list-panel-node/list-panel-node.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
  useDeletePublicationMutation,
  useGetAllPublicationsMutation,
  useGetAllPublicationsWithPaginationMutation
} from "@/middlewares/publication.ts";
import {useAppSelector} from "@/services/store.ts";
import {publicationSelectors} from "@/services/publication.ts";

type Page = {}

export const PublicationsPage: FC<Page> = ({...props}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [getAllPublications] = useGetAllPublicationsMutation();
  const [getAllPublicationsWithPagination] = useGetAllPublicationsWithPaginationMutation();
  const [deletePublication] = useDeletePublicationMutation();

  const publications = useAppSelector(publicationSelectors.allPublications);
  const total = useAppSelector(publicationSelectors.total);

  useEffect(() => {
    getAllPublications()
  }, []);

  const onUploadYet = () => {
    getAllPublicationsWithPagination({offset: publications.length})
  }

  const onDelete = async (id: string) => {
    await deletePublication({id});
    if (location.pathname.includes(id)) {
      navigate('/publications');
    }
  }
  
  return (
    <ExpandPanel expandWidth={650} headerTitle={'Все публикации'}
                 bodyPanel={
                    <ListPanel width={600} onUploadYet={onUploadYet} uploadYetButtonShow={total > publications.length} isNewButton={true} titleNewButton={'Добавить новую публикацию'} onClickNewButton={() => navigate('/publications/new')}>
                      {publications.map((e) => (
                        <ListPanelNode publication={e} key={e.$id} onDelete={() => onDelete(e.$id)} onClick={() => navigate(`/publications/${e.$id}`)} active={location.pathname.includes(e.$id)}/>
                      ))}
                    </ListPanel>
                }>
      <Outlet />
    </ExpandPanel>
  )
  
}