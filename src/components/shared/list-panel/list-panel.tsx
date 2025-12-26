import type {FC, PropsWithChildren} from "react";
import styles from './list-panel.module.css';

type Props = {}

export const ListPanel: FC<Props & PropsWithChildren> = ({children, ...props}) => {

  return (
    <div className={styles.main}>
      {children}
    </div>
  )

}