import { FC, useEffect, useRef } from "react";
import classes from './slider.module.scss'
import { ChangeInput } from "../changeInput/ChangeInput";


interface IProps {
    max: number;
    valueMax: number;
    setValueMax: (valueMax: number) => void;
    onBlur: (valMax: number) => void;
}

const MIN_WIDTH = 100;

export const Slider: FC<IProps> = ({max, valueMax, setValueMax, onBlur}) => {

    const slider = useRef<HTMLDivElement>(null)
    const refThumbMax = useRef<HTMLDivElement>(null)
    const refInactiveRight = useRef<HTMLDivElement>(null)

    const setGrab = () => {
        document.body.style.cursor = 'grab'
    }

    const deleteGrab = () => {
        document.body.style.cursor = ''
    }

    const onmousedownMax = (e: MouseEvent) => {
        setGrab()
        e.preventDefault()
        document.body.style.touchAction = 'none';

        if(refThumbMax.current){
            const shiftX = e.clientX - refThumbMax.current.getBoundingClientRect().left;
            
            let targetMax = valueMax;

            const onMouseMove = function(event: MouseEvent){
                event.preventDefault();
                if(slider.current && refThumbMax.current && refInactiveRight.current){

                    const leftSlider =  slider.current.getBoundingClientRect().left;
                    let newLeft = event.clientX - shiftX - leftSlider;
                    
                    if(newLeft < 0){
                        newLeft = 0;
                    }
                    
                    let rightEdge = slider.current.offsetWidth - refThumbMax.current.offsetWidth;
                    
                    if(newLeft > rightEdge){
                        newLeft = rightEdge;
                    }

                    const p = Math.round(newLeft) / (slider.current.offsetWidth - refThumbMax.current.offsetWidth);
                    const numb = (max * p)
                    const result = numb < MIN_WIDTH ? MIN_WIDTH : numb; 
                    setValueMax(Math.round(result))
                    targetMax = Math.round(result)
                }
            }

            const onMouseUp = function() {
                deleteGrab()
                document.body.style.touchAction = '';
                document.removeEventListener('pointerup', onMouseUp);
                document.removeEventListener('pointermove', onMouseMove);
                onBlur(targetMax)
            }

            document.addEventListener('pointermove', onMouseMove)
            document.addEventListener('pointerup', onMouseUp);
        }
    }

    useEffect(() => {
        if(slider.current && refThumbMax.current && refInactiveRight.current){
            const p = max / (slider.current.offsetWidth - refThumbMax.current.offsetWidth);
            let r = (valueMax / p)
            refThumbMax.current.style.left = r / slider.current.offsetWidth * 100 + '%'
            refInactiveRight.current.style.width = 100 - r / (slider.current.offsetWidth - refThumbMax.current.offsetWidth) * 100 + '%'
        }
    }, [valueMax])

    useEffect(() => {
        if(refThumbMax.current && slider.current){

            refThumbMax.current.onpointerdown = onmousedownMax;

            refThumbMax.current.ondragstart = function() {
                return false;
            };
        }
    }, [valueMax])
    
    return (
        <section className={classes.wrapper}>
            <ChangeInput 
                valueMax={valueMax} 
                max={max} 
                min={MIN_WIDTH}
                onBlur={onBlur} 
            />
            <section ref={slider} className={classes.slider}>
                <section ref={refInactiveRight} className={classes.inactiveRight}></section>
                <section ref={refThumbMax} className={classes.thumb + " " + classes.max}></section>
            </section>
        </section>
    )
}