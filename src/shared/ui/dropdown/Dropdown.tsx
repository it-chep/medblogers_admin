import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import classes from './dropdown.module.scss'

interface IProps {
    items: {name: string, icon: ReactNode}[];
    selected?: {name: string, icon: ReactNode};
    onSelected: (item: string) => void;
    open?: boolean;
}

export const Dropdown: FC<IProps & PropsWithChildren> = ({items, selected, onSelected, open: openGlobal, children}) => {

    const [open, setOpen] = useState<boolean>(false)

    const onDeleteInput = (e: MouseEvent) => {
        const target = e.target as Element;
        const input = target.closest(`.${classes.container}`)
        if(!input){
            setOpen(false)
            document.removeEventListener('click', onDeleteInput)
        }
    }

    useEffect(() => {
        if(open){
            setTimeout(() => document.addEventListener('click', onDeleteInput))
        }
    }, [open])

    useEffect(() => {
        if(!openGlobal){
            setOpen(!!openGlobal)
        }
    }, [openGlobal])

    const onSelectedWrap = (item: string) => {
        setOpen(false)
        onSelected(item)
    }

    return (
        <section className={classes.container}>   
            <section 
                className={classes.selected}
                onClick={() => setOpen(!open)}
                onMouseDown={e => e.preventDefault()}
            >
                {
                    children 
                        ||
                    <section className={classes.icon}>
                        {selected?.icon}
                        <svg className={classes.arrow + (open ? ` ${classes.open}` : '')} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 12L16 22L6 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </section>
                }
            </section>
            <ul className={classes.list + (open ? ` ${classes.open}` : '')}>
                {items.map(item => 
                    <li 
                        key={item.name} 
                        onClick={() => onSelectedWrap(item.name)}
                    >
                        {item.icon}
                        {item.name}
                        {
                            item.name === selected?.name
                                &&
                            <svg className={classes.selectedIcon} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27 9L13 23L6 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                    </li>
                )}
                </ul>
        </section>
    )
}