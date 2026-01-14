import type {FC} from "react";
import styles from './documents-viewer.module.css';

type Props = {
  src: string
}

export const DocumentsViewer: FC<Props> = ({src, ...props}) => {

  return (
    <div className={styles.main}>
     <iframe className={styles.iframe} src={src}></iframe>
    </div>
  )

}