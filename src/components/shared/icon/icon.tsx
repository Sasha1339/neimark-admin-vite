import {type FC} from "react";

type Props = {
  className?: string;
  size?: number;
  rotate?: number;
  name: string;
  cover?: boolean;
  sizeClassName?: boolean;
  nocache?: boolean;
  onClick?: () => void;
}

export const Icon: FC<Props> = ({className, onClick, name, sizeClassName = false, cover = false, rotate = 0, size = 30, nocache, ...props}) => {


  return (
    <img onClick={onClick} className={className} style={{transform: `rotate(${rotate}deg)`}} width={sizeClassName ? undefined : size + 'px'} height={sizeClassName ? undefined : size + 'px'} src={`/svg/${name}.svg${nocache ? `?t=${new Date()}` : ''}`} alt={'?'}/>
  )

}