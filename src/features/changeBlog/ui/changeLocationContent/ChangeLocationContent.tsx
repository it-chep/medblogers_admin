import { FC, ReactNode, useEffect, useState } from "react";
import classes from './changeLocationContent.module.scss'
import { getNodeElement } from "../../../../shared/lib/helpers/getNodeElement";
import { paragraph } from "../../lib/conts/paragraph";
import { Dropdown } from "../../../../shared/ui/dropdown";
import { LocationLeft } from "../../lib/assets/LocationLeft";
import { LocationCenter } from "../../lib/assets/LocationCenter";
import { LocationRight } from "../../lib/assets/LocationRight";

interface IProps {
    range: Range | null;
    selectedFigure: string;
}

type TLocation = 'left' | 'center' | 'right'

export const ChangeLocationContent: FC<IProps> = ({range, selectedFigure}) => {

    const [currentElem, setCurrentElem] = useState<HTMLElement | null>(null)
    
    const getLocation = (currentElem: HTMLElement | null): TLocation | null => {
        const locationBuf = currentElem?.style.textAlign;
        if (locationBuf === 'left' || locationBuf === 'center' || locationBuf === 'right'){
            return locationBuf as TLocation
        }
        return null
    }

    const [currentLocation, setCurrentLocation] = useState<TLocation>(getLocation(currentElem) || 'left')

    const getParentElem = (range: Range) => {
        const startContainer: Element | null = getNodeElement(range.startContainer) 
        return startContainer?.closest(paragraph);
    }

    useEffect(() => {
        const sel = window.getSelection()
        if(sel && sel.rangeCount > 0){
            const range = sel.getRangeAt(0)
            const parentElement = getParentElem(range)
            if(parentElement){
                setCurrentElem(parentElement as HTMLElement)
                setCurrentLocation(getLocation(parentElement as HTMLElement) || 'left')
            }
        }
    }, [range])

    const setTargetLocation = (target: HTMLElement, location: TLocation) => {
        target.style.textAlign = location;
        setCurrentLocation(location)
    }

    const onChange = (location: TLocation) => {
        if(selectedFigure){
            const target = document.querySelector(`[data-id="${selectedFigure}"]`) 
            if(target){
                const parentFigure = target.parentElement;
                if(parentFigure){
                    if(!selectedFigure.includes('video')){
                        setTargetLocation(parentFigure, location)
                    }
                }
            }
        }
        else if(currentElem){
            setTargetLocation(currentElem, location)
        }
    }

    const lists: {value: TLocation, name: string, onClick: () => void, icon: ReactNode}[] = [
        {name: 'Слева', value: 'left', onClick: () => onChange('left'), icon: <LocationLeft />},
        {name: 'По центру', value: 'center', onClick: () => onChange('center'), icon: <LocationCenter />},
        {name: 'Справа', value: 'right', onClick: () => onChange('right'), icon: <LocationRight />},
    ]

    const onSelected = (name: string) => {
        const target = lists.find(l => l.name === name)
        if(target){
            target.onClick()
        }
    }

    return (
        <section className={classes.container}>
            <Dropdown
                items={lists.map(l => ({name: l.name, icon: l.icon}))}
                selected={lists.find(l => l.value === currentLocation)}
                onSelected={onSelected}
                width={200}
            />
        </section>
    )
}