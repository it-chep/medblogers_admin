import { ComponentProps, FC } from "react";
import classes from './plusSvg.module.scss'

interface IProps {
    onCLick?: () => void;
}

export const PlusSvg: FC<ComponentProps<'svg'> & IProps> = ({onCLick, ...props}) => {

    return (
        <svg onClick={onCLick} className={classes.svg} {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11 16H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 11V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}