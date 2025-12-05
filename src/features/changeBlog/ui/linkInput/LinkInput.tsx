import { FC, useEffect, useRef, useState } from "react";
import { MyInput } from "../../../../shared/ui/myInput";
import classes from './linkInput.module.scss'

interface IProps {
    onSend: () => void;
    onClose: () => void;
    value: string;
    setValue: (val: string) => void;
}

export const LinkInput: FC<IProps> = ({onClose, onSend, value, setValue}) => {

    const inputRef = useRef<HTMLInputElement>(null)
    
    const onCloseWrap = () => {
        onClose()
        document.removeEventListener('click', onDeleteInput)
    }

    const onSendWrap = () => {
        onSend()
        document.removeEventListener('click', onDeleteInput)
    }
    
    const onDeleteInput = (e: MouseEvent) => {
        const target = e.target as Element;
        const input = target.closest(`.${classes.link}`)
        if(!input){
            onClose()
            document.removeEventListener('click', onDeleteInput)
        }
    }
    
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus()
        }
        setTimeout(() => document.addEventListener('click', onDeleteInput))

        return () => {
            document.removeEventListener('click', onDeleteInput)
        }
    }, [])

    return (
        <section className={classes.link}>
            <MyInput
                ref={inputRef}
                onMouseDown={() => inputRef.current?.focus()}
                type="text"
                value={value}
                setValue={setValue}
                placeholder="Вставьте или введите ссылку ↩"
            >
                <section className={classes.features}>
                    <section 
                        className={classes.send} 
                        onClick={onSendWrap}
                    >
                        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 15L4 21L10 27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 7H21C22.8565 7 24.637 7.7375 25.9497 9.05025C27.2625 10.363 28 12.1435 28 14V14C28 15.8565 27.2625 17.637 25.9497 18.9497C24.637 20.2625 22.8565 21 21 21H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </section>
                    <section 
                        className={classes.delete} 
                        onClick={onCloseWrap}
                    >
                        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 7L7 25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M25 25L7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </section>
                </section>
            </MyInput>
        </section>
    )
}