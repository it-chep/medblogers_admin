import { ComponentProps, FC, KeyboardEvent, useEffect, useState } from "react";
import classes from './inputEdit.module.scss'

interface IProps {
    value: string;
    setValue: (value: string) => void;
    width?: number;
    sign?: string;
}

export const InputEdit: FC<IProps & ComponentProps<'input'>> = ({value, setValue, width, sign, ...props}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newVal, setNewVal] = useState<string>(value)

    const onEdit = (edit: boolean) => {
        if(!edit){
            setValue(newVal)
        }
        setEdit(edit)
    }

    const onClose = () => {
        setEdit(false)
        setNewVal(value)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            setEdit(false)
        }
        if(e.key === 'Escape'){
            onClose()
        }
    }

    return (
        <section className={classes.container}>
                {
                    sign    
                        &&
                    <span className={classes.sign}>
                        {sign}:
                    </span>
                }
                {
                    edit
                            ?
                        <input 
                            className={classes.input}
                            value={newVal} 
                            onChange={e => setNewVal(e.target.value)} 
                            onKeyDown={e => onKeyDown(e)}
                            style={{width}} 
                            {...props}
                        />
                            :
                        <span className={classes.value}>
                            {value}
                        </span>
                }
            {
                edit
                    ?
                <section className={classes.accept}>
                    <svg onClick={onClose} width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 7L7 25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M25 25L7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg onClick={() => onEdit(false)} width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 9L13 23L6 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </section>
                    :
                <svg className={classes.editSvg} onClick={() => onEdit(true)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5502 1.58437L9.42592 2.70855L11.0417 4.32431L12.1654 3.20055C12.6113 2.75417 12.6115 2.03078 12.1657 1.58437M10.5502 1.58437C10.9963 1.13853 11.7195 1.13864 12.1657 1.58437H10.5502ZM10.1578 5.20821L8.542 3.5924L2.22697 9.9068C2.0935 10.0403 1.9988 10.2075 1.95301 10.3906L1.48409 12.2658L3.35922 11.7969C3.54234 11.751 3.70959 11.6564 3.84308 11.5229M8.11825 2.24839C8.112 2.25418 8.10583 2.26013 8.09967 2.26623C8.09358 2.2723 8.08767 2.27849 8.08192 2.28475L1.34309 9.02288C1.04946 9.31655 0.841093 9.68455 0.740352 10.0874L0.018685 12.9732C-0.0345816 13.1862 0.0278268 13.4115 0.183077 13.5668C0.338318 13.722 0.563644 13.7845 0.776644 13.7312L3.66246 13.0095C4.06534 12.9088 4.43328 12.7005 4.72694 12.4068L13.0494 4.08429C13.9834 3.14976 13.9835 1.63508 13.0496 0.700546C12.1153 -0.233371 10.6008 -0.233587 9.6665 0.700329L8.11825 2.24839ZM7.91667 13.1249C7.91667 12.7797 8.1965 12.4999 8.54167 12.4999H13.125C13.4702 12.4999 13.75 12.7797 13.75 13.1249C13.75 13.47 13.4702 13.7499 13.125 13.7499H8.54167C8.1965 13.7499 7.91667 13.47 7.91667 13.1249Z" />
                </svg>
            }
        </section>
    )
}