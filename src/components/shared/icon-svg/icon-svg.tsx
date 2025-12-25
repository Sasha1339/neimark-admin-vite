import {type FC, type SVGProps} from "react";
import {colors} from "@/shared/colors.ts";
import styles from './icon-svg.module.css';

// Тип для пропсов
interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  color?: keyof typeof colors;
  size?: number | string;
  className?: string;
}

// Импортируем все SVG файлы динамически
const iconModules = import.meta.glob('@/assets/svg/*.svg', {
  eager: true,
  import: 'default',
  query: '?react',
});

// Создаем карту иконок
const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {};

// Обрабатываем импортированные модули
Object.keys(iconModules).forEach((path) => {
  const iconName = path
    .split('/')
    .pop()!
    .replace(/\.svg$/, '');

  const Component = iconModules[path] as FC<SVGProps<SVGSVGElement>>;

  if (Component) {
    icons[iconName] = Component;
  }
});

export const IconSvg: FC<IconProps> = ({
                                     name,
                                     size = 30,
                                     className = '',
                                         color,
                                     ...props
                                   }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Иконка "${name}" не найдена`);
    return null;
  }

  return (<div style={{width: `${size}px`, height: `${size}px`}}>

    <IconComponent
      className={`${styles.main} ${className}`}
      width={`${size}`}
      height={`${size}`}
      fill={color && colors[color]}
      {...props}
    />

    </div>
  );
};