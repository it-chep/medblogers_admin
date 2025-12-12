import { FC, PropsWithChildren, ReactNode, RefObject, useEffect, useState } from "react";
import { Dropdown } from "../../../../shared/ui/dropdown";
import { getNodeElement } from "../../../../shared/lib/helpers/getNodeElement";
import { paragraph } from "../../lib/conts/paragraph";
import classes from './changeParagraph.module.scss'
import { H2 } from "../../lib/assets/H2";
import { H3 } from "../../lib/assets/H3";
import { Text } from "../../lib/assets/Text";
import { ListSvg } from "../../lib/assets/ListSvg";
import { ListNumSvg } from "../../lib/assets/ListNumSvg";
import { getCurrentRange } from "../../lib/helpers/getCurrentRange";
import { recoverRange } from "../../lib/helpers/recoverRange";


interface IProps {
    contentRef: RefObject<HTMLDivElement | null>;
    range: Range | null;
}

export const ChangeParagraph: FC<IProps & PropsWithChildren> = ({range, contentRef}) => {
    
    const getParentElem = (range: Range) => {
        const startContainer: Element | null = getNodeElement(range.startContainer) 
        return startContainer?.closest(paragraph);
    }
    
    const changeParagraph = 'p, h2, h3, ol, ul'

    function replaceElem(parentElem: Element, newElemTag: 'p' | 'h2' | 'h3' | 'ol' | 'ul'): boolean {  
        
        const sel = window.getSelection()
        let range: Range | null = null;

        if(sel && sel.rangeCount > 0){
            range = sel.getRangeAt(0)
        }
        if(range && (parentElem.tagName === 'P' || parentElem.tagName === 'H2' || parentElem.tagName === 'H3')){
            
            const {startOffset, startContainer, date} = getCurrentRange(range, parentElem)

            const newP = document.createElement(newElemTag);
            const content = parentElem.innerHTML;
            let li: HTMLLIElement | null = null;
            if(newElemTag === 'ul' || newElemTag === 'ol'){
                li = document.createElement('li')
                li.innerHTML = content
                newP.append(li)
            }
            else{
                newP.innerHTML = content;
            }

            parentElem.parentNode?.replaceChild(newP, parentElem);

            recoverRange(startContainer, startOffset, sel, li, parentElem, newP, date)
            
            return true
        }
        else if(range && ((parentElem.tagName === 'UL' && newElemTag === 'ol') || (parentElem.tagName === 'OL' && newElemTag === 'ul'))){
            let list: HTMLUListElement | HTMLOListElement = document.createElement('ul');
            if((parentElem.tagName === 'UL' && newElemTag === 'ol')){
                list = document.createElement('ol')
            }
            if(parentElem.parentNode){
                const {startOffset, startContainer, date} = getCurrentRange(range, parentElem)
                list.innerHTML = parentElem.innerHTML;
                parentElem.parentNode.replaceChild(list, parentElem)
                recoverRange(startContainer, startOffset, sel, null, parentElem, list, date)
            }
            return true
        }
        return false
    }

    const onList = (type: 'ul' | 'ol'): boolean => {
        if(contentRef.current){
            const sel = window.getSelection()
            if(sel && sel.rangeCount > 0){
                const range = sel.getRangeAt(0)
                const parentElement = getParentElem(range)
                if(parentElement){
                    return replaceElem(parentElement, type)
                }
            }
        }
        return false
    }

    const onP = (): boolean => {
        const sel = window.getSelection()
        if(sel && sel.rangeCount > 0){
            const range = sel.getRangeAt(0)
            const parentElement = getParentElem(range)
            if(parentElement){
                return replaceElem(parentElement, 'p')
            }
        }
        return false
    }

    const onH = (tagName: 'h2' | 'h3'): boolean => {
        const sel = window.getSelection()
        if(sel && sel.rangeCount > 0){
            const range = sel.getRangeAt(0)
            const parentElement = getParentElem(range)
            if(parentElement){
                return replaceElem(parentElement, tagName)
            }
        }
        return false
    }

    const lists: {paragraph: string, name: string, onClick: () => boolean, icon: ReactNode}[] = [
        {name: 'Обычный текст', paragraph: 'p', onClick: onP, icon: <Text />},
        {name: 'Заголовок 2', paragraph: 'h2', onClick: () => onH('h2'), icon: <H2 />},
        {name: 'Заголовок 3', paragraph: 'h3', onClick: () => onH('h3'), icon: <H3 />},
        {name: 'Список', paragraph: 'ul', onClick: () => onList('ul'), icon: <ListSvg />},
        {name: 'Нумерованный список', paragraph: 'ol', onClick: () => onList('ol'), icon: <ListNumSvg />},
    ]
    
    const [selected, setSelected] = useState<{name: string, icon: ReactNode}>({name: lists[0].name, icon: lists[0].icon})
    
    const onSelected = (name: string) => {
        const target = lists.find(l => l.name === name)
        if(target){
            const replace = target.onClick()
            if(replace){
                setSelected({name: target.name, icon: target.icon})
            }
        }
    }

    const getTagRange = (range: Range) => {
        const startContainer: Element | null = getNodeElement(range.startContainer) 
        const targetParagraph = startContainer?.closest(changeParagraph)
        if(targetParagraph){
            return targetParagraph.tagName.toLocaleLowerCase()
        }
        return null
    }

    useEffect(() => {
        if(range){
            const tag = getTagRange(range)
            if(tag){
                const target = lists.find(l => l.paragraph === tag)
                if(target){
                    setSelected({name: target.name, icon: target.icon})
                }
            }
        }
    }, [range])

    return (
        <section className={classes.container}>
            <Dropdown 
                items={lists.map(l => ({name: l.name, icon: l.icon}))}
                selected={selected}
                onSelected={onSelected}
            >
            </Dropdown>
        </section>
    )
}