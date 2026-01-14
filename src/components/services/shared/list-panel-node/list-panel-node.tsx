import type {FC} from "react";
import styles from './list-panel-node.module.css';
import type {Room} from "@/shared/types.ts";
import {formatDate, getFullName, getNameRoom} from "@/shared/functions.ts";
import {Button} from "@/components/shared/button/button.tsx";
import clsx from "clsx";

type Props = {
  room: Room
  active: boolean;
  onSelect: (name: string) => void;
}

export const ListPanelNode: FC<Props> = ({room, onSelect, active, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})} onClick={() => onSelect(room.id)}>
      <div className={styles.description}>
        <div className={styles.name}>{getNameRoom(room)}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.description_column}>
          <div className={styles.date}>{`на ${formatDate(room.date)}`}</div>
        </div>

        <div className={styles.description_column_right}>
          <div className={styles.status}>{room.status}</div>
        </div>
      </div>
    </div>
  )

}