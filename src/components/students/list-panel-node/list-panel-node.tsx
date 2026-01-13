import type {FC} from "react";
import styles from './list-panel-node.module.css';

type Props = {
  name: string;
  description: string;
}

export const ListPanelNode: FC<Props> = ({name, description, ...props}) => {

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>{description}</div>
      </div>
    </div>
  )

}