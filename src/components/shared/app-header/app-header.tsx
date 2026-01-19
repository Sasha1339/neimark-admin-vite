import type {FC} from "react";
import styles from './app-header.module.css';
import {Icon} from '@/components/shared/icon/icon.tsx';
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {Outlet, useNavigate} from "react-router-dom";

const links = {
  publications: 'Публикации',
  services: 'Консьерж-сервис',
  timetable: 'Редактор расписания',
  students: 'Студенты',
  documents: 'Документы'
}

type Props = {

}

export const AppHeader: FC<Props> = ({...props}) => {

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div>
          <Icon className={styles.logo} name={'logo'} sizeClassName={true} />
        </div>
        <div>

        </div>
      </header>
      <main className={styles.main}>
        <ExpandPanel expandWidth={300} links={links} onClick={(link) => {navigate(`/${link}`)}}>
          <Outlet />
        </ExpandPanel>
      </main>
    </>

  )

}