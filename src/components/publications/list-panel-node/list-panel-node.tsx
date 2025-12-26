import type {FC} from "react";
import styles from './list-panel-node.module.css';

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
        <div className={styles.edit}>Редактировать</div>
        <div className={styles.delete}>Удалить</div>
      </div>
    </div>
  )

}