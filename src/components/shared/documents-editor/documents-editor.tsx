import {type FC} from 'react';
import styles from './documents-editor.module.css';
import clsx from "clsx";
import 'styles/date-style.css';
import type {DocumentForm} from "@/shared/types.ts";
import {Button} from "@/components/shared/button/button.tsx";
import {formatDate} from "@/shared/functions.ts";

export interface Props {
  document: DocumentForm
}

export const DocumentsEditor: FC<Props> = ({
                                        document,
                                        ...props
                                      }) => {



  return (
    <div className={styles.main}>
      <div
        className={clsx(styles.description)}>
        {`${document.name} (загружен ${formatDate(document.date)})`}
      </div>
      <div className={styles.buttons}>
        <Button title={'Посмотреть'} size={'small'} color={'main-purple'} />
        <Button title={'Удалить'} size={'small'} color={'main-red'} />
      </div>
    </div>
  );
};
