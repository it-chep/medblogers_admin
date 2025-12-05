import { FC, MouseEvent, useState } from "react";
import { Action } from "../action/Action";
import classesRange from './selectedRange.module.scss'
import { LinkInput } from "../linkInput/LinkInput";

interface IProps {
    getRange: () => Range | null;
    newSelection: (range: Range, selectionClass: string) => ChildNode[];
    selectionClasses: {[key: string]: boolean};

    open: boolean;
}

export const SelectedRange: FC<IProps> = ({getRange, newSelection, selectionClasses, open}) => {

    const [link, setLink] = useState<string>('')
    const [range, setRange] = useState<Range | null>(null)
    const [linkOpen, setLinkOpen] = useState<boolean>(false)

    const onB = (e: MouseEvent) => {
        e.preventDefault();
        const range = getRange()
        if(range){
            newSelection(range, 'bold')
        }
    }
        
    const onI = (e: MouseEvent) => {
        e.preventDefault();
        const range = getRange()
        if(range){
            newSelection(range, 'italic')
        }
    }
    
    const onU = (e: MouseEvent) => {
        e.preventDefault();
        const range = getRange()
        if(range){
            newSelection(range, 'underline')
        }
    }
    
    const onSetLink = (elems: ChildNode[]) => {
        if(link){
    
            const getElementLink = () => elems.filter(e => e.nodeName === 'SPAN')

            const linkElems = getElementLink()
            
            linkElems.forEach(elem => {
                const element = elem as HTMLSpanElement;
                element.dataset.href = link;
            })
        }
    }
    
    const onA = (e: MouseEvent) => {
        e.preventDefault();
        const range = getRange()
        if(range && selectionClasses['link']){
            newSelection(range, 'link')
            return
        }
        if(range){
            setRange(range)
        }
        setLinkOpen(true)
    }

    const onSendLink = () => {
        if(range){
            const elems = newSelection(range, 'link')
            onSetLink(elems)
        }
        onCloseLink()
    }

    const onCloseLink = () => {
        setLinkOpen(false)
        
        const sel = window.getSelection()
        if(sel && range){
            sel.removeAllRanges()
            sel.addRange(range)
        }

        setLink('')
    }

    return (
        <section className={classesRange.container}>
            {
                linkOpen
                    ?
                <section className={classesRange.link}>
                    <LinkInput 
                        onSend={onSendLink}
                        onClose={onCloseLink}
                        value={link}
                        setValue={setLink}
                    />
                </section>
                    :
                <section className={classesRange.actions + (open ? ` ${classesRange.open}` : '')}>
                    <Action
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 15H19C20.3261 15 21.5979 15.5268 22.5355 16.4645C23.4732 17.4021 24 18.6739 24 20C24 21.3261 23.4732 22.5979 22.5355 23.5355C21.5979 24.4732 20.3261 25 19 25H8V6H17.5C18.6935 6 19.8381 6.47411 20.682 7.31802C21.5259 8.16193 22 9.30653 22 10.5C22 11.6935 21.5259 12.8381 20.682 13.682C19.8381 14.5259 18.6935 15 17.5 15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        onClick={onB}
                        classes={'bold'}
                        selectionClasses={selectionClasses}
                    />
                    <Action 
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 7L13 25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 25H18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 7H24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                        onClick={onI}
                        classes={'italic'}
                        selectionClasses={selectionClasses}
                    />
                    <Action 
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 27H27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 7V14.5C8 16.6217 8.84285 18.6566 10.3431 20.1569C11.8434 21.6571 13.8783 22.5 16 22.5C18.1217 22.5 20.1566 21.6571 21.6569 20.1569C23.1571 18.6566 24 16.6217 24 14.5V7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                        onClick={onU}
                        classes={'underline'}
                        selectionClasses={selectionClasses}
                    />
                    <Action 
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7625 20.2375L20.2375 11.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.1251 22.3625L14.5876 25.9C14.0303 26.4573 13.3687 26.8994 12.6406 27.201C11.9124 27.5026 11.132 27.6578 10.3439 27.6578C8.75214 27.6578 7.22562 27.0255 6.1001 25.9C4.97459 24.7745 4.34229 23.248 4.34229 21.6562C4.34229 20.0645 4.97459 18.538 6.1001 17.4125L9.6376 13.875" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22.3625 18.125L25.9 14.5875C27.0255 13.462 27.6578 11.9355 27.6578 10.3437C27.6578 8.75203 27.0255 7.22551 25.9 6.1C24.7745 4.97448 23.248 4.34218 21.6562 4.34218C20.0645 4.34218 18.538 4.97448 17.4125 6.1L13.875 9.6375" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                        onClick={onA}
                        classes={'link'}
                        selectionClasses={selectionClasses}
                    />
                </section>
            }
        </section>
    )
}