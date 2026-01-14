import {type FC, useState} from "react";
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {ListPanel} from "@/components/shared/list-panel/list-panel.tsx";
import {ListPanelNode} from "@/components/documents/list-panel-node/list-panel-node.tsx";
import type {DocumentData} from "@/shared/types.ts";
import {withUrlDocuments} from "@/shared/functions.ts";
import {DocumentsViewer} from "@/components/documents/documents-viewer/documents-viewer.tsx";

const data = [
  {
    name: 'Паспорт',
    file: 'file.pdf',
    date: '2027-02-17T07:00:00.000Z',
    status: 'На проверке',
    student: {
      firstname: 'Александр',
      lastname: 'Алексеев',
      email: 'email@email.com'
    }
  },
  {
    name: 'Паспорт',
    file: 'razdel.pdf',
    date: '2027-02-17T07:00:00.000Z',
    status: 'На проверке',
    student: {
      firstname: 'Александр',
      lastname: 'Алексеев',
      email: 'email@email.com'
    }
  },
  {
    name: 'Паспорт',
    file: '',
    date: '2027-02-17T07:00:00.000Z',
    status: 'На проверке',
    student: {
      firstname: 'Александр',
      lastname: 'Алексеев',
      email: 'email@email.com'
    }
  },
  {
    name: 'Паспорт',
    file: '',
    date: '2027-02-17T07:00:00.000Z',
    status: 'На проверке',
    student: {
      firstname: 'Александр',
      lastname: 'Алексеев',
      email: 'email@email.com'
    }
  },
  {
    name: 'Паспорт',
    file: '',
    date: '2027-02-17T07:00:00.000Z',
    status: 'На проверке',
    student: {
      firstname: 'Александр',
      lastname: 'Алексеев',
      email: 'email@email.com'
    }
  },
];

type Page = {}

export const DocumentsPage: FC<Page> = ({...props}) => {

  const [search, setSearch] = useState('');
  const [documentId, setDocumentId] = useState<string | null>(null)


  const filterStudents = (e: DocumentData) => {
    const searchCase = search.toLowerCase();
    const nameCase = e.name.toLowerCase();
    return searchCase.includes(nameCase) || searchCase === '' || nameCase.includes(searchCase);
  }

  return (
    <ExpandPanel expandWidth={650} headerTitle={'Документы'}
                 bodyPanel={
                   <ListPanel isSearching={true} onSearchChange={(e) => setSearch(e)} width={400}>
                     {data.filter(filterStudents).map((e, i) => (
                       <ListPanelNode documentData={e} key={i} active={documentId === e.file} onSelect={(id) => setDocumentId(id)}/>
                     ))}
                   </ListPanel>
                 }>
      {documentId && <DocumentsViewer src={withUrlDocuments(documentId)} />}
    </ExpandPanel>
  )

}