"use client"

import { ComponentProps, FC, PropsWithChildren, useRef } from "react";
import classes from './myInput.module.scss'

interface IProps{
    value: string;
    typeInput?: string;
    onBlur?: () => void;
    setValue: (value: string) => void;
    isLoading?: boolean;
    error?: string;
    setError?: (err: string) => void;
    sign?: string;
    
}

export const MyInput: FC<IProps & ComponentProps<'input'> & PropsWithChildren> = (
    {value, setValue, typeInput, onBlur = () => {}, error, setError = () => {}, sign,  children, ...props}
) => {

    const refWrap = useRef<HTMLDivElement>(null)

    const onBlurInput = () => {
        onBlur()
        if(refWrap.current){
            refWrap.current.classList.remove(classes.hightlight)
        }
    }

    const onFocus = () => {
        if(refWrap.current){
            refWrap.current.classList.add(classes.hightlight)
        }
    }

    const setValueWrap = (val: string) => {
        setError('')
        setValue(val)
    }

    return (
        <section className={classes.wrapper}>
            <section className={classes.inputBox}>
                {
                    sign
                        &&
                    <section className={classes.sign}>
                        {sign}
                    </section>
                }
                <section ref={refWrap} className={classes.wrap}>
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
            {error && <span className={classes.errorText}>*{error}</span> }
        </section>
    )
}