import {type FC} from 'react';
import styles from './documents-editor.module.css';
import clsx from "clsx";
import 'styles/date-style.css';
import {Button} from "@/components/shared/button/button.tsx";
import {formatDate} from "@/shared/functions.ts";
import type {DocumentFile} from "@/shared/documents/types.ts";
import {getNameDocument} from "@/shared/documents/functions.ts";

export interface Props {
  document: DocumentFile
}

export const DocumentsEditor: FC<Props> = ({
                                        document,
                                        ...props
                                      }) => {

  const onClick = () => {
    window.open(document.file_url, '_blank', 'noopener,noreferrer');
  }


  return (
    <div className={styles.main}>
      <div
        className={clsx(styles.description)}>
        {`${getNameDocument(document.type)} (загружен ${formatDate(document.$updatedAt)})`}
      </div>
      <div className={styles.buttons}>
        <Button title={'Посмотреть'} size={'small'} color={'main-purple'} onClick={onClick} />
        <Button title={'Удалить'} size={'small'} color={'main-red'} />
      </div>
    </div>
  );
};
