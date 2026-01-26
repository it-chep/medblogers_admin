import { FC, useEffect, useState } from "react";
import classes from './imageResize.module.scss'
import { Slider } from "../slider";


interface IProps {
    selectedFigure: string;
}

const MAX_WIDTH = 700;

export const ImageResize: FC<IProps> = ({selectedFigure}) => {
    
    const target = document.querySelector(`[data-id="${selectedFigure}"]`) 
    
    const getCurrentWidth = (): number | null => {
        const target = document.querySelector(`[data-id="${selectedFigure}"]`) 
        if(target){
            const parentFigure = target.parentElement;
            if(parentFigure && !selectedFigure.includes('video')){
                const width = target.getBoundingClientRect().width;
                return width
            }
        }
        return null
    }

    const [value, setValue] = useState<string>(String(getCurrentWidth()))

    const onChangeSize = () => {
        if(target && target.parentElement && !selectedFigure.includes('video')){
            const elem = target as HTMLElement;
            elem.style.width = value + 'px'
        }
    }

    useEffect(() => {
        onChangeSize()
    }, [value])

    const [valueMax, setValueMax] = useState<number>(+value)
    
    const onBlurSlider = (valMax: number) => {
        setValue(String(valMax))
        setValueMax(valMax)
    }

    useEffect(() => {
        setValue(String(valueMax))
    }, [valueMax])

    return (
        <section className={classes.container}>
            <Slider
                valueMax={valueMax}
                setValueMax={setValueMax}
                onBlur={onBlurSlider}
                max={700}
            />
        </section>
    )
}