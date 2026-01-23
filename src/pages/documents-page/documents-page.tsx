import {type FC, useEffect, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {ListPanelNode} from "@/components/documents/list-panel-node/list-panel-node.tsx";
import {useAppSelector} from "@/services/store.ts";
import {documentSelectors} from "@/services/document.ts";
import {
  useApprovedDocumentMutation,
  useGetAllDocumentsMutation,
  useGetAllDocumentsWithPaginationMutation, useRejectedDocumentMutation
} from "@/middlewares/document.ts";
import type {DocumentFile} from "@/shared/documents/types.ts";
import {getNameDocument, getNameStatus} from "@/shared/documents/functions.ts";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {splitByNonLetters, splitByNonLettersAndNumber} from "@/shared/functions.ts";

type Page = {}

export const DocumentsPage: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const [getAllDocuments] = useGetAllDocumentsMutation();
  const [getAllDocumentsWithPagination] = useGetAllDocumentsWithPaginationMutation();
  const [approveDocument] = useApprovedDocumentMutation();
  const [rejectDocument] = useRejectedDocumentMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const documents = useAppSelector(documentSelectors.allDocuments);
  const total = useAppSelector(documentSelectors.total);

  useEffect(() => {
    getAllDocuments()
  }, []);

  const onUploadYet = () => {
    getAllDocumentsWithPagination({offset: documents.length})
  }

  const filterStudents = (e: DocumentFile) => {
    const searchCase = splitByNonLettersAndNumber(search !== null ? search.toLowerCase() : '');
    const firstNameCase = e.type ? getNameDocument(e.type).toLowerCase() : '';
    const secondNameCase = e.status ? getNameStatus(e.status).toLowerCase() : '';
    const patronymicCase = e.$id ? e.$id.toLowerCase() : '';
    const description = `${firstNameCase} ${secondNameCase} ${patronymicCase}`;
    return searchCase.length === 0 || searchCase.every((e) => description.includes(e));
  }

  return (
    <ExpandPanel headerTitle={'Документы'}
                 bodyPanel={
                   <ListPanel onUploadYet={onUploadYet} uploadYetButtonShow={total > documents.length}
                              isSearching={true} onSearchChange={(e) => setSearch(e)} width={400}>
                     {documents.filter(filterStudents).map((e, i) => (
                       <ListPanelNode onApprove={() => approveDocument({documentId: e.$id})}
                                      onReject={() => rejectDocument({documentId: e.$id})} documentData={e} key={i}
                                      active={location.pathname.includes(e.file_id)}
                                      onSelect={(id) => navigate(`/documents/${id}`)}/>
                     ))}
                   </ListPanel>
                 }>
      <Outlet/>
    </ExpandPanel>
  )

}