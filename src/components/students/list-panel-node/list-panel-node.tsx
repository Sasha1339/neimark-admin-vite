import type {FC} from "react";
import styles from './list-panel-node.module.css';
import clsx from "clsx";

type Props = {
  name: string;
  description: string;
  active: boolean;
  onSelect?: () => void;
}

export const ListPanelNode: FC<Props> = ({name, description, active, onSelect, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})} onClick={onSelect}>
      <div className={styles.description}>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.info}>{description}</div>
      </div>
    </div>
  )

}