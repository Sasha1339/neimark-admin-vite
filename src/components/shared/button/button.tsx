import {type FC} from 'react';
import styles from './button.module.css';
import {colors} from "@/shared/colors.ts";
import clsx from "clsx";

export interface Props {
  title: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  color?: keyof typeof colors;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  buttonClassName?: string;
}

export const Button: FC<Props> = ({
                                    title,
                                    onClick,
                                    color,
                                    disabled = false,
                                    buttonClassName,
                                    type = 'button',
                                    size = 'large',
                                    ...props
                                  }) => {

  return (
    <button
      className={
        clsx(
          styles.main,
          {[styles.purple_color]: color === 'main-purple'},
          {[styles.orange_color]: color === 'main-active'},
          {[styles.red_color]: color === 'main-red'},
          {[styles.green_color]: color === 'main-green'},
          {[styles.medium_size]: size === 'medium'},
          {[styles.small_size]: size === 'small'},
          buttonClassName
        )
      }
      type={type}
      onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};
