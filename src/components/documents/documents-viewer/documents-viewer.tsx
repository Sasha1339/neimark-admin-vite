import type {FC} from "react";
import styles from './documents-viewer.module.css';
import {useParams} from "react-router-dom";
import {withDocumentUrl} from "@/shared/documents/functions.ts";

type Props = {

}

export const DocumentsViewer: FC<Props> = ({...props}) => {

  const params = useParams<{id: string}>()

  return (
    <div className={styles.main}>
      {params.id && <iframe className={styles.iframe} src={withDocumentUrl(params.id)}></iframe>}
    </div>
  )

}