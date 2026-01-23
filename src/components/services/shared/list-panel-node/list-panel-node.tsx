import type {FC} from "react";
import styles from './list-panel-node.module.css';
import {formatDateWithoutTime, getNameRoom} from "@/shared/functions.ts";
import clsx from "clsx";
import type {ServiceModel} from "@/shared/services/types.ts";
import {getColorByServiceStatus, getNameServiceStatus} from "@/shared/services/functions.ts";
import {colors} from "@/shared/colors.ts";

type Props = {
  service: ServiceModel
  active: boolean;
  onSelect?: (name: string) => void;
}

export const ListPanelNode: FC<Props> = ({service, onSelect, active, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})} onClick={() => onSelect?.(service.$id)}>
      <div className={styles.description}>
        <div className={styles.name}>{getNameRoom(service)}</div>
      </div>
      <div className={styles.description}>
        <div className={styles.description_column}>
          <div className={styles.date}>{service.scheduled_date ? `на ${formatDateWithoutTime(service.scheduled_date)}, ${service.time_slot}` : ''}</div>
        </div>

        <div className={styles.description_column_right}>
          <div className={styles.status} style={{color: colors[getColorByServiceStatus(service.status)], borderColor: colors[getColorByServiceStatus(service.status)]}}>{getNameServiceStatus(service.status)}</div>
        </div>
      </div>
    </div>
  )

}