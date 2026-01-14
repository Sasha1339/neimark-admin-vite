import type {FC} from "react";
import styles from './list-panel-node.module.css';
import type {DocumentData} from "@/shared/types.ts";
import {formatDate, getFullName} from "@/shared/functions.ts";
import {Button} from "@/components/shared/button/button.tsx";
import clsx from "clsx";

type Props = {
  documentData: DocumentData
  active: boolean;
  onSelect: (name: string) => void;
}

export const ListPanelNode: FC<Props> = ({documentData, onSelect, active, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})}>
      <div className={styles.description}>
        <div className={styles.description_column}>
          <div className={styles.signature}>Документ</div>
          <div className={styles.name}>{documentData.name}</div>
        </div>

        <Button title={'Посмотреть'} size={'small'} color={'main-purple'} onClick={() => onSelect(documentData.file)} />
      </div>
      <div className={styles.description}>
        <div className={styles.description_column}>
          <div className={styles.signature}>Последнее измнение</div>
          <div className={styles.date}>{formatDate(documentData.date)}</div>
        </div>

        <div className={styles.description_column_right}>
          <div className={styles.signature}>Статус</div>
          <div className={styles.status}>{documentData.status}</div>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.description_column}>
          <div className={styles.signature}>Студент</div>
          <div className={styles.student}>{getFullName(documentData.student)}</div>
        </div>

      </div>
      <div className={styles.description}>
        <div className={styles.email}>{documentData.student.email}</div>
      </div>
      <div className={styles.description}>
        <Button title={'Принять'} color={'main-green'} size={'small'} />
        <Button title={'Отозвать'} color={'main-red'} size={'small'} />
      </div>
    </div>
  )

}