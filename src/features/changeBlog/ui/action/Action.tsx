import React, { FC, MouseEvent, ReactNode, SVGProps } from "react";
import classesAction from './action.module.scss'


interface IProps {
    onClick: (e: MouseEvent) => void;
    icon: ReactNode;
    selectionClasses?: {[key: string]: boolean};
    classes?: string;
}


export const Action: FC<IProps> = (
    {icon, onClick, selectionClasses, classes}
) => {

    return (
        <section 
            onClick={onClick}
            className={classesAction.container + (selectionClasses && classes && selectionClasses[classes] ? ` ${classesAction.selected}` : '')}
        >
            {icon}
        </section>
    )
}