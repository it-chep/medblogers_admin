import { FC } from "react";
import classes from './buttonBlock.module.scss'

interface IProps {
    onClick: () => void;
}

export const ButtonBlock: FC<IProps> = ({onClick}) => {

    return (
        <button 
            onClick={onClick} 
            className={classes.button}
        >
            Назад
        </button>
    )
}