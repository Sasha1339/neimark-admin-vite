import type {FC} from "react";
import styles from './app-header.module.css';
import {Icon} from '@/components/shared/icon/icon.tsx';
import {ExpandPanel} from "@/components/shared/expand-panel/expand-panel.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useLogoutMutation} from "@/middlewares/user.ts";

const links = {
  publications: 'Публикации',
  services: 'Консьерж-сервис',
  // timetable: 'Редактор расписания',
  students: 'Студенты',
  documents: 'Документы'
}

type Props = {}

export const AppHeader: FC<Props> = ({...props}) => {

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const onLogout = () => {
    logout();
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <Icon className={styles.logo} name={'logo'} sizeClassName={true}/>
        </div>
        <div>

        </div>
      </header>
      <main className={styles.main}>
        <ExpandPanel links={links} onClick={(link) => {
          navigate(`/${link}`)
        }} onLogout={onLogout}>
          <Outlet/>
        </ExpandPanel>
      </main>
    </>

  )

}