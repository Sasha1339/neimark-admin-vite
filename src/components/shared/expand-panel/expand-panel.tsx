import {type FC, type PropsWithChildren, type ReactNode, useEffect, useRef, useState} from "react";
import styles from './expand-panel.module.css';
import {IconSvg} from "@/components/shared/icon-svg/icon-svg.tsx";
import {gsap} from 'gsap';
import {useLocation} from "react-router-dom";
import clsx from "clsx";

type Props = {
  expandWidth: number;
  headerTitle?: string;
  links?: Record<string, string>;
  bodyPanel?: ReactNode
  onClick?: (link: string) => void;
}

export const ExpandPanel: FC<Props & PropsWithChildren> = ({expandWidth, onClick, bodyPanel, headerTitle, children, links, ...props}) => {

  const [expanded, setExpanded] = useState(true);
  const panel = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {

      if (expanded) {
        gsap.to(panel.current, {width: 'auto', duration: 1, ease: 'power1.inOut'})
      } else {
        gsap.to(panel.current, {width: '60px', duration: 1, ease: 'power1.inOut'})
      }


  }, [expanded]);

  return (
    <div className={styles.main}>
      <nav ref={panel} className={headerTitle ? styles.panel_sub_navigation : styles.panel_navigation}>
        {!headerTitle ? <div className={styles.up_icon}>
          <IconSvg name={'expand-button'} onClick={() => setExpanded(prev => !prev)}  color={'main-white'}/>
        </div> : <div className={styles.up_icon_with_title}>
          <div className={styles.title}>{headerTitle}</div>
          <IconSvg name={'arrow'} rotate={expanded ? 180 : 0} onClick={() => setExpanded(prev => !prev)}/>
        </div>}
        {!headerTitle ? <div className={styles.body_navigation}>
          <div className={styles.links_navigation}>
            {links && Object.entries(links).map((e, i) => (
              <div className={clsx(styles.icon_with_title, {[styles.icon_with_title_active]: location.pathname.includes(e[0])})} key={i}  onClick={() => onClick?.(e[0])}>
                <IconSvg name={e[0]} color={'main-white'}/>
                <div className={styles.link}>{e[1]}</div>
              </div>
            ))}
          </div>

          <div className={styles.icon_with_title}>
            <IconSvg name={'logout'} color={'main-white'}/>
            <div className={styles.link}>Выход</div>
          </div>
        </div> : <div className={styles.body_panel} style={{transform: expanded ? '' : 'translate(-60px)'}}>
          {bodyPanel}
        </div>}
      </nav>
      <div className={styles.window}>
        {children}
      </div>
    </div>


  )

}