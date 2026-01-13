import type {FC} from "react";
import styles from './list-panel-node.module.css';
import {Button} from "@/components/shared/button/button.tsx";

type Props = {
  title: string;
  date: string;
  type: string;
}

export const ListPanelNode: FC<Props> = ({title, type, date, ...props}) => {

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.type}>{type}</div>
      </div>
      <div className={styles.buttons}>
        <Button title={'Редактировать'} size={'small'} color={'main-purple'} />
        <Button title={'Удалить'} size={'small'} color={'main-red'} />
      </div>
    </div>
  )

}