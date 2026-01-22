import type {FC} from "react";
import styles from './list-panel-node.module.css';
import {Button} from "@/components/shared/button/button.tsx";
import clsx from "clsx";
import {formatDateWithoutTime} from "@/shared/functions.ts";
import {toCategory} from "@/shared/publications/mappers.ts";
import type {Publication} from "@/shared/publications/types.ts";

type Props = {
  publication: Publication;
  active?: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export const ListPanelNode: FC<Props> = ({publication, active, onClick, onDelete, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})}>
      <div className={styles.description}>
        <div className={styles.title}>{publication.title}</div>
        <div className={styles.date}>{formatDateWithoutTime(publication.$updatedAt)}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.type}>{toCategory(publication.category)}</div>
      </div>
      <div className={styles.buttons}>
        <Button title={'Редактировать'} size={'small'} color={'main-purple'} onClick={onClick}/>
        <Button title={'Удалить'} size={'small'} color={'main-red'} onClick={onDelete} disabled={true}/>
      </div>
    </div>
  )

}