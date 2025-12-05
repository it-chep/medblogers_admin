"use client"

import { ComponentProps, FC, PropsWithChildren, useRef } from "react";
import classes from './myInput.module.scss'

interface IProps{
    value: string;
    typeInput?: string;
    onBlur?: () => void;
    setValue: (value: string) => void;
    isLoading?: boolean;
    setError?: (err: string) => void;
    sign?: string;
}

export const MyInput: FC<IProps & ComponentProps<'input'> & PropsWithChildren> = (
    {value, setValue, typeInput, onBlur = () => {}, setError = () => {}, sign,  children, ...props}
) => {

    const refBox = useRef<HTMLDivElement>(null)

    const onBlurInput = () => {
        onBlur()
        if(refBox.current){
            refBox.current.classList.remove(classes.hightlight)
        }
    }

    const onFocus = () => {
        if(refBox.current){
            refBox.current.classList.add(classes.hightlight)
        }
    }

    const setValueWrap = (val: string) => {
        setError('')
        setValue(val)
    }

    return (
        <section ref={refBox} className={classes.inputBox}>
            <section className={classes.sign}>
                {sign}&nbsp;
            </section>
            <section className={classes.wrap}>
                <input 
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlurInput}
                    type={typeInput || 'text'} 
                    value={value} 
                    onChange={e => setValueWrap(e.target.value)}
                />
                {children}
            </section>
        </section>
    )
}