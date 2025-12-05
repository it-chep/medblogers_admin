import { ComponentProps, FC, useRef, useState } from "react";
import classes from './myTextarea.module.scss'

interface IProps{
    label?: string;
    value: string;
    setValue: (value: string) => void;
}

export const MyTextarea: FC<IProps & ComponentProps<'textarea'>> = ({value, setValue, label, ...props}) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [isFocus, setFocus] = useState<boolean>(false)

    const onClick = () => {
        if(containerRef.current && textareaRef.current && labelRef.current){
            setFocus(true)
            containerRef.current.classList.add(classes.focus)
            labelRef.current.classList.remove(classes.active)
            textareaRef.current.focus()
        }
    }

    const onBlur = () => {
        if(textareaRef.current && labelRef.current && containerRef.current){
            if(value === ''){
                labelRef.current.classList.add(classes.active)
            }
            containerRef.current.classList.remove(classes.focus)
            textareaRef.current.blur()
        }
    }

    return(
        <section 
            ref={containerRef}
            onBlur={onBlur} 
            onClick={onClick} 
            className={classes.container}
        >
            <span 
                ref={labelRef} 
                className={classes.label + ((value === '' && !isFocus) ? ` ${classes.active}` : '')}
            >
                {label}
            </span>
            <textarea 
                {...props}
                ref={textareaRef} 
                value={value} 
                onChange={e => setValue(e.target.value)} 
            />
        </section>
    )
}