import { FC, RefObject, useEffect, useState } from "react";
import classes from './bgDiv.module.scss'
import { getNodeElement } from "../../../../shared/lib/helpers/getNodeElement";
import { getCurrentRange } from "../../lib/helpers/getCurrentRange";
import { recoverRange } from "../../lib/helpers/recoverRange";

interface IProps {
    range: Range | null;
    contentRef: RefObject<HTMLDivElement | null>;
    newRange: () => void;
}

export const BgDiv: FC<IProps> = ({range, contentRef, newRange}) => {

    const [highlight, setHighlight] = useState<boolean>(false)

    const checkInsideSection = (elems: Element[]): HTMLDivElement | null => {  
        for(let elem of elems){
            if(elem.tagName === 'SECTION'){
                return elem as HTMLDivElement
            }
        }
        return null
    } 
        
    const getParentContainer = (node: Node): Element | null => {
        if(contentRef){
            let currentElem = node.parentElement;
            while (currentElem){
                if(currentElem.parentElement === contentRef.current){
                    break
                }
                currentElem = currentElem.parentElement;
            }
            return currentElem
        }
        return null
    }

    const onClick = () => {
        if(highlight){
            deleteBg()
        }
        else{
            setBg()
        }
        newRange() // в ChangeBlog передаем ф-ию для сохранения нового range
    }

    const fullElemsInRange = (range: Range) => {

        const elems: Element[] = []
        let currentElem: Element | null = getParentContainer(range.startContainer)

        while(currentElem){
            if(range.intersectsNode(currentElem) && (currentElem.parentElement === contentRef.current)){
                elems.push(currentElem)
                currentElem = currentElem.nextElementSibling
            }
            else{
                break
            }
        }
        return elems
    }

    const setBg = () => {
        if(range){
            const elemsInRange = fullElemsInRange(range)
            if(checkInsideSection(elemsInRange)){
                return
            }
            const pElem = getNodeElement(range.startContainer)
            if(pElem && elemsInRange.length > 0){
                const {startOffset, startContainer, date} = getCurrentRange(range, pElem)

                const section = document.createElement('section')   
                section.classList.add('bg')
                section.classList.add('color-blue')
                elemsInRange[0].insertAdjacentElement('beforebegin', section)
                section.append(...elemsInRange)
        
                const sel = window.getSelection()
                recoverRange(startContainer, startOffset, sel, null, pElem, pElem, date)
            }
        }
    }

    const deleteBg = () => {
        if(range){
            const elemsInRange = fullElemsInRange(range)
            let p: Element | null = checkInsideSection(elemsInRange);
            if(!p){
                p = getParentContainer(range.startContainer)
            }

            const parentElem = p;

            const pElem = getNodeElement(range.startContainer)
            if(pElem && parentElem && parentElem.tagName === 'SECTION'){
                const {startOffset, startContainer, date} = getCurrentRange(range, pElem)

                const elems = Array.from(parentElem.children)
                elems.forEach(elem => {
                    parentElem.insertAdjacentElement('beforebegin', elem)
                })
                parentElem.remove()

                const sel = window.getSelection()
                recoverRange(startContainer, startOffset, sel, null, pElem, pElem, date)
            }            
        }
    }

    const checkHighlight = () => {
        if(range){
            const elemsInRange = fullElemsInRange(range)
            let parentElem: Element | null = checkInsideSection(elemsInRange);
            if(!parentElem){
                parentElem = getParentContainer(range.startContainer)
            }
            if(parentElem && parentElem.tagName === 'SECTION'){
                setHighlight(true)
                return
            }
        }
        setHighlight(false)
    }

    useEffect(() => {
        checkHighlight()
    }, [range])

    return (
        <section className={classes.container}>
            <section 
                onClick={onClick} 
                className={classes.paint}
            >
                <svg className={highlight ? ` ${classes.highlight}` : ''} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.875 15.4375L15.85 27.4625C15.4734 27.8335 14.9661 28.0415 14.4375 28.0415C13.9089 28.0415 13.4015 27.8335 13.025 27.4625L2.41247 16.85C2.04147 16.4735 1.8335 15.9661 1.8335 15.4375C1.8335 14.9089 2.04147 14.4015 2.41247 14.025L14.4375 2L27.875 15.4375Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.5 17C16.8807 17 18 15.8807 18 14.5C18 13.1193 16.8807 12 15.5 12C14.1193 12 13 13.1193 13 14.5C13 15.8807 14.1193 17 15.5 17Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26 25.5C26 23 28.5 20.5 28.5 20.5C28.5 20.5 31 23 31 25.5C31 26.163 30.7366 26.7989 30.2678 27.2678C29.7989 27.7366 29.163 28 28.5 28C27.837 28 27.2011 27.7366 26.7322 27.2678C26.2634 26.7989 26 26.163 26 25.5V25.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.7375 12.7375L4.73755 3.7375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>

        </section>
    )
}