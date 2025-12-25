import {type FC, type PropsWithChildren, useState} from "react";
import styles from './expand-panel.module.css';
import {Icon} from "@/components/shared/icon/icon.tsx";
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";

type Props = {
  expandWidth: number;
  headerTitle?: string;
  links?: Record<string, string>;
}

export const ExpandPanel: FC<Props & PropsWithChildren> = ({expandWidth, headerTitle, links, ...props}) => {

  const [expanded, setExpanded] = useState(true);

  return (
    <div className={styles.main}>
      <nav className={headerTitle ? styles.panel_sub_navigation : styles.panel_navigation} style={{width: expanded ? `${expandWidth}px` : '60px'}}>
        {!headerTitle ? <div className={styles.up_icon}>
          <IconSvg name={'expand-button'} onClick={() => setExpanded(prev => !prev)}  color={'main-white'}/>
        </div> : <div className={styles.up_icon_with_title}>
          <div className={styles.title}>{headerTitle}</div>
          <IconSvg name={'arrow'} rotate={expanded ? 180 : 0} onClick={() => setExpanded(prev => !prev)}/>
        </div>}
        <div className={styles.body_navigation}>
          <div className={styles.links_navigation}>
            {links && Object.entries(links).map((e, i) => (
              <div className={styles.icon_with_title} key={i}>
                <IconSvg name={e[0]} color={'main-white'}/>
                <div className={styles.link}>{e[1]}</div>
              </div>
            ))}
          </div>

          <div className={styles.icon_with_title}>
            <IconSvg name={'logout'} color={'main-white'}/>
            <div className={styles.link}>Выход</div>
          </div>
        </div>
      </nav>
      <div className={styles.window}>

      </div>
    </div>


  )

}