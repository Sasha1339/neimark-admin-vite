import type {FC} from "react";
import styles from './list-panel-node.module.css';
import {Button} from "@/components/shared/button/button.tsx";
import clsx from "clsx";
import {formatDateWithoutTime} from "@/shared/functions.ts";
import type {PublicationLink} from "@/shared/publications/types.ts";
import {toCategory} from "@/shared/publications/mappers.ts";

type Props = {
  publication: PublicationLink;
  active?: boolean;
  onClick: () => void;
}

export const ListPanelNode: FC<Props> = ({publication, active, onClick, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})}>
      <div className={styles.description}>
        <div className={styles.title}>{publication.title}</div>
        <div className={styles.date}>{formatDateWithoutTime(publication.date)}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.type}>{toCategory(publication.category)}</div>
      </div>
      <div className={styles.buttons}>
        <Button title={'Редактировать'} size={'small'} color={'main-purple'} onClick={onClick}/>
        <Button title={'Удалить'} size={'small'} color={'main-red'} />
      </div>
    </div>
  )

}