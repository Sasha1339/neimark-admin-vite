import type {FC} from "react";
import styles from './list-panel-node.module.css';
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";
import clsx from "clsx";

export type LinkService = {
  title: string;
  url: string;
}

type Props = {
  link: LinkService;
  active: boolean;
  onSelect?: (value: string) => void;
}

export const ListPanelNode: FC<Props> = ({link, onSelect, active, ...props}) => {

  return (
    <div className={clsx(styles.main, {[styles.active]: active})} onClick={() => onSelect?.(link.url)}>
      <div className={styles.title}>{link.title}</div>
      <IconSvg name={'arrow'} className={styles.icon} rotate={180}/>
    </div>
  )

}