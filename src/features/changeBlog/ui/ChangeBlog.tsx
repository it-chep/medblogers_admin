import React, { ClipboardEvent, FC, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import classes from './change.module.scss'
import { getNodeElement } from "../../../shared/lib/helpers/getNodeElement";
import { newParagraph } from "../../../shared/lib/helpers/newParagraph";
import { HeaderChange } from "./headerChange/HeaderChange";
import { paragraph } from "../lib/conts/paragraph";
import { setPointer } from "../../../shared/lib/helpers/setPointer";
import { NewParagraph } from "./newParagrpaph/NewParagraph";
import { useAppSelector } from "../../../app/store/store";
import { encoder } from "../../../shared/lib/helpers/encoder";
import { figureClickHandler } from "./VideoPreviewInsert/VideoInsert";

type TElementClass = {class: string, text: string, href?: string}

export const ChangeBlog: FC = () => {
    
    const contentRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [currentSelection, setCurrentSelection] = useState<Range | null>(null)
    const [currentSel, setCurrentSel] = useState<Range | null>(null)

    const [selectionClasses, setSelectionClasses] = useState<{[key: string]: boolean}>({})
    
    const [currentElem, setCurrentElem] = useState<HTMLParagraphElement | null>(null);

    const {blog} = useAppSelector(s => s.blogReducer)

    const [selectedFigure, setSelectedFigure] = useState<string>('')

    const initVideoDelete = () => {
        const sections = containerRef.current?.querySelectorAll('figure section')
        sections?.forEach(section => 
            figureClickHandler(section as HTMLElement, section.parentElement as HTMLElement, setSelectedFigure)
        )
    }
    
    useEffect(() => {
        if(contentRef.current){
            const body = encoder(blog.body)
            contentRef.current.innerHTML = body
            setTimeout(initVideoDelete)
        }
    }, [])

    function newRange() {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && contentRef.current) {
            const range = sel.getRangeAt(0);
            setCurrentSel(range.cloneRange())
        }
    }

    function selectionClassesInRange (range: Range) {
        if(range.collapsed){
            setSelectionClasses({})
        }
        else{
            const spans = getSpansInRange(range)
            const classes = getClassesInSpans(spans)
            setSelectionClasses(classes)
        }
    }

    function getRange(): Range | null {
        const sel = window.getSelection();
        if(sel){
            let range = sel.getRangeAt(0)
            
            if(currentSelection){
                sel.removeAllRanges()
                sel.addRange(currentSelection)
                range = currentSelection
                return range
            }
            
            if(range.collapsed){
                return null
            }

            return range
        }
        return null
    }

    function saveSelection(elems: ChildNode[], startOffset: number | null, endOffset: number | null) {
        if(elems.length < 1) return
        const rangeNew = new Range();
        const firstElem = elems[startOffset ?? 0];
        const lastElem = elems[endOffset ?? (elems.length - 1)];

        if(firstElem.nodeType === Node.TEXT_NODE){
            rangeNew.setStart(firstElem, 0)
        }
        else if(firstElem.firstChild){
            rangeNew.setStart(firstElem.firstChild, 0)
        }

        if (lastElem.textContent && lastElem.nodeType === Node.TEXT_NODE) {
            rangeNew.setEnd(lastElem, lastElem.textContent.length);
        } else {
            if(lastElem.firstChild?.textContent){
                rangeNew.setEnd(lastElem.firstChild, lastElem.firstChild.textContent.length)
            }
        }
            
        selectionClassesInRange(rangeNew)
        setCurrentSelection(rangeNew);

        const sel = window.getSelection()
        if(sel){
            sel.removeAllRanges()
            sel.addRange(rangeNew)
        }
    }

    function newSelection(range: Range, selectionClass: string): ChildNode[] {

        const rangeText = range.toString();

        const elems = toggleClass(range, selectionClass);
        
        let startElemInd: number | null = null;
        let endElemInd: number | null = null;

        elems.forEach((elem, ind) => {
            if((startElemInd === null) && elem.textContent && rangeText.includes(elem.textContent)){
                startElemInd = ind;
            }
            if(startElemInd && elem.textContent && rangeText.includes(elem.textContent)){
                endElemInd = ind;
            }
        })

        saveSelection(elems, startElemInd, endElemInd)
        
        return elems;
    }

    const onMouseUp = () => {
        setCurrentSelection(null)
        const sel = window.getSelection()
        if(sel && sel.rangeCount > 0){
            const range = sel.getRangeAt(0)
            setCurrentSel(range.cloneRange())
            selectionClassesInRange(range)
        }
    }

    function getClassesInSpans (spans: HTMLSpanElement[]): {[key: string]: boolean} {
        const classes: {[key: string]: boolean} = {};

        for (let span of spans) {
            const classesInSpan = span.className.trim().split(' ')
            for(let classInSpan of classesInSpan){
                classes[classInSpan] = true
            } 
        }

        return classes
    }

    const newLi = (sel: Selection, li: HTMLLIElement) => {
        const newLi = document.createElement('li')
        li.insertAdjacentElement('afterend', newLi)
        setPointer(sel, newLi)
    }

    const setVisibleParagraph = (elem: HTMLParagraphElement, opacity?: boolean) => {
        if(containerRef.current){
            setVisible(true)
            setCurrentElem(elem)
            setTop(elem.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
            setOpacity(true)
        }
    }

    const setVisibleParagraphSelection = (opacity?: boolean) => {
        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0 && contentRef.current) {
            const range = sel.getRangeAt(0);
            const startContainer: Element | null = getNodeElement(range.startContainer) 
            const parentElement = startContainer?.closest('p');
            if(parentElement?.parentElement && !parentElement.textContent){
                setVisibleParagraph(parentElement)
                return
            }
        }
        setVisible(false)   
        setOpacity(false)
    }

    const onKeyUp = () => {
        if(contentRef.current?.lastChild?.textContent){
            newP()
        }

        setVisibleParagraphSelection()
        newRange()
    }

    const newP = () => {
        const p = document.createElement('p')
        const br = document.createElement('br')
        p.append(br)
        contentRef.current?.append(p)
    }

    const checkLi = (sel: Selection): HTMLLIElement | null => {
        if(sel.rangeCount > 0){
            const range = sel.getRangeAt(0)
            if(range.collapsed){
                const li = getNodeElement(range.startContainer)?.closest('li')
                if(li){
                    return li
                }
            }
        }
        return null
    }

    const clearDivAfterDeleteList = () => {
        const div = contentRef.current?.firstElementChild;
        if(div?.tagName === 'DIV'){
            div.remove()
        }
    }

    const newLevelList = (sel: Selection) => {
        if(sel.rangeCount > 0){
            const li = checkLi(sel)
            const range = sel.getRangeAt(0);
            const startContainer: Element | null = getNodeElement(range.startContainer) 
            const parentElement = startContainer?.closest('ul, ol');
            if(li && parentElement){
                const list = document.createElement(parentElement.tagName.toLocaleLowerCase())
                li.insertAdjacentElement('beforebegin', list)
                list.append(li)
                setPointer(sel, li)
            }
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {

        newRange()
        if(e.key === 'Backspace'){
            const lastChild = contentRef.current?.lastChild;
            if(!lastChild?.textContent){
                const prevLastChild = lastChild?.previousSibling;
                if(prevLastChild?.textContent){
                    const lc = contentRef.current?.lastChild
                    setTimeout(() => {
                        if(!lc?.parentElement){
                            newP()
                        }
                    })
                }
            }
            
            setTimeout(clearDivAfterDeleteList)

            const targetDeleteBlock = currentSel?.commonAncestorContainer;
            if(!targetDeleteBlock?.textContent){
                if(targetDeleteBlock?.ELEMENT_NODE){
                    const targetDeleteBlockElem = targetDeleteBlock as Element;
                    targetDeleteBlockElem.remove()
                }
            }

            if(contentRef.current?.childNodes.length === 1 && !contentRef.current.firstElementChild?.textContent){
                e.preventDefault();
            }
        }
        const sel = window.getSelection()
        if(sel && e.key === 'Tab'){
            e.preventDefault()
            newLevelList(sel)
        }
        if ((e.key === 'Enter')) {
            if(e.shiftKey){
                return
            }
            e.preventDefault();
            if (sel && sel.rangeCount > 0 && contentRef.current) {
                const range = sel.getRangeAt(0);
                
                const startContainer: Element | null = getNodeElement(range.startContainer) 
                const parentElement = startContainer?.closest(paragraph);

                const parentLi = startContainer?.closest('li')  // если мы внутри списка 
                if(parentLi){ 
                    // заполненный: значит надо добавить новый li, иначе удалить
                    if(parentLi.textContent){ 
                        newLi(sel, parentLi)
                        return 
                    }
                    else{
                        parentLi.remove()
                    }
                }
                // если мы находимся во вложенном списке (мы удалили предыдущий li и теперь во внешнем списке), 
                // значит надо добавить li во внешний список
                if(parentElement?.parentElement?.tagName === 'UL' || parentElement?.parentElement?.tagName === 'OL'){ 
                    const newP = newParagraph(parentElement, 'li')
                    setPointer(sel, newP)
                    return
                }
                
                const parentElementSection = startContainer?.closest('.bg');
                if(parentElement && parentElementSection && !parentElement.textContent){
                    const newP = newParagraph(parentElementSection, 'p')
                    setPointer(sel, newP)
                    return
                }

                // если это не список, значит добавляем пустой параграф
                if(parentElement){
                    const newP = newParagraph(parentElement, 'p')
                    setPointer(sel, newP)
                }
            }
        }
    }

    const getSpanOrTextNode = (node: Node) => {
        const parent = node.parentElement;
        if(parent){
            if(parent.tagName === 'SPAN'){
                return parent
            }
        }
        return node
    }

    const checkClass = (prevClasses: string, newClass: string) => {
        if(selectionClasses[newClass]){
            return prevClasses.replace(newClass, '').trim()
        }
        return (prevClasses + ' ' + newClass).trim()
    }

    function removeEmptyElems(elems: Element[]){
        for(let elem of elems){
            if(!elem.textContent){
                elem.remove()
            }
        }
    }

    const getElementClasses = (range: Range, newClass: string): TElementClass[] => {
        const elementClasses: TElementClass[] = [];
        const parent = range.commonAncestorContainer;
        const startNode = getSpanOrTextNode(range.startContainer);
        const endNode = getSpanOrTextNode(range.endContainer);

        let currentNode: Node | null = parent.firstChild;

        const elems: Element[] = [];
        while (currentNode){
            if(range.intersectsNode(currentNode)){
                if(currentNode.nodeType === Node.TEXT_NODE){
                    if(currentNode === startNode){
                        const startSelectionRange = document.createRange()
                        startSelectionRange.setStart(currentNode, range.startOffset) 
                        startSelectionRange.setEnd(currentNode, (currentNode.textContent || '').length) 
                        const textRange = startSelectionRange.toString()
                        startSelectionRange.deleteContents()
                        if(textRange){
                            elementClasses.push({class: checkClass('', newClass), text: textRange})
                        }
                    }
                    else if(currentNode === endNode){
                        const endSelectionRange = document.createRange()
                        endSelectionRange.setStart(currentNode, 0) 
                        endSelectionRange.setEnd(currentNode, range.endOffset) 
                        const textRange = endSelectionRange.toString()
                        endSelectionRange.deleteContents()
                        if(textRange){
                            elementClasses.push({class: checkClass('', newClass), text: textRange})
                        }
                    }
                    else if(currentNode.textContent){
                        elementClasses.push({class: checkClass('', newClass), text: currentNode.textContent})
                    }
                }
                else if(currentNode.nodeType === Node.ELEMENT_NODE){
                    const elem = currentNode as Element
                    if(currentNode === startNode){
                        if(currentNode.firstChild){
                            const startSelectionRange = document.createRange()
                            startSelectionRange.setStart(currentNode.firstChild, range.startOffset) 
                            startSelectionRange.setEnd(currentNode.firstChild, (currentNode.firstChild.textContent || '').length) 
                            const textRange = startSelectionRange.toString()
                            startSelectionRange.deleteContents()
                            if(textRange){
                                let href: string | undefined = undefined;
                                if(currentNode.nodeName === 'SPAN'){
                                    const spanElem = currentNode as HTMLSpanElement;
                                    href = spanElem.dataset.href; 
                                }
                                elementClasses.push({class: checkClass(elem.className, newClass), text: textRange, href})
                            }
                        }
                    }
                    else if(currentNode === endNode){
                        if(currentNode.firstChild){
                            const endSelectionRange = document.createRange()
                            endSelectionRange.setStart(currentNode.firstChild, 0) 
                            endSelectionRange.setEnd(currentNode.firstChild, range.endOffset) 
                            const textRange = endSelectionRange.toString()
                            endSelectionRange.deleteContents()
                            if(textRange){
                                let href: string | undefined = undefined;
                                if(currentNode.nodeName === 'SPAN'){
                                    const spanElem = currentNode as HTMLSpanElement;
                                    href = spanElem.dataset.href; 
                                }
                                elementClasses.push({class: checkClass(elem.className, newClass), text: textRange, href})
                            }
                        }
                    }
                    else if(currentNode.textContent){
                        const elem = currentNode as Element
                        let href: string | undefined = undefined;
                        if(currentNode.nodeName === 'SPAN'){
                            const spanElem = currentNode as HTMLSpanElement;
                            href = spanElem.dataset.href; 
                        }
                        elementClasses.push({class: checkClass(elem.className, newClass), text: currentNode.textContent, href})
                    }
                    elems.push(elem)  // добавлем все эл-ты 
                }
            }
            currentNode = currentNode.nextSibling;
        }

        removeEmptyElems(elems)

        return elementClasses
    }

    const createFragments = (elementClasses: TElementClass[]): DocumentFragment => {
        const fragments = document.createDocumentFragment()
        for (let elementClass of elementClasses){
            const text = elementClass.text;
            const classes = elementClass.class;
            if(!text){
                continue
            }
            if(!classes.trim()){
                const textNode = document.createTextNode(text);
                fragments.appendChild(textNode)
            }
            else{
                const newSpan = document.createElement('span')
                newSpan.className = elementClass.class;
                newSpan.textContent = elementClass.text;
                if(elementClass.href){
                    console.log(elementClass)
                    if(elementClass.class.includes('link')){
                        newSpan.dataset.href = elementClass.href;
                    }
                    else{
                        delete newSpan.dataset.href
                    }
                }
                fragments.appendChild(newSpan)
            }
        }
        return fragments
    }

    const textSplit = (range: Range, newClass: string): TElementClass[] => {
        const elementClasses: TElementClass[] = [
            {
                class: checkClass('', newClass),
                text: range.toString(),
            }
        ];
        return elementClasses
    }

    const spanSplit = (range: Range, newClass: string, container: Element): TElementClass[] => {
        const textContainer = container.textContent || ''
        const textStart = textContainer.slice(0, range.startOffset)
        const textEnd = textContainer.slice(range.endOffset, textContainer.length)
        const elementClasses: TElementClass[] = []
        if(textStart){
            elementClasses.push({
                class: container.className,
                text: textStart
            }) 
        }
        let href: string | undefined = undefined;
        if(container.nodeName === 'SPAN'){
            const spanElem = container as HTMLSpanElement;
            href = spanElem.dataset.href; 
        }
        elementClasses.push({
            class: checkClass(container.className, newClass),
            text: range.toString(),
            href
        })
        if(textEnd){
            elementClasses.push({
                class: container.className,
                text: textEnd
            })
        }
        container.remove()
        return elementClasses
    }

    const getSpansInRange = (range: Range): HTMLSpanElement[] => {
        const spans: HTMLSpanElement[] = [];
        const container = getNodeElement(range.commonAncestorContainer)
        // Если диапазон полностью внутри одного элемента
        
        if(container){
            if(container.tagName === 'SPAN'){
                spans.push(container as HTMLSpanElement)
            }
            const walker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_ELEMENT,
                {
                    acceptNode: (node) => {
                        if (node.nodeName === 'SPAN' && range.intersectsNode(node)) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_SKIP;
                    }
                }
            );
            // Используем TreeWalker для поиска span элементов в диапазоне
            
            let currentNode: Node | null = walker.nextNode();
            while (currentNode) {
                spans.push(currentNode as HTMLSpanElement);
                currentNode = walker.nextNode();
            }
        }
        
        return spans;
    };

    const getRanges = (range: Range): Range[] => {
        const ranges: Range[] = [];
        
        // Получаем общий контейнер
        const commonAncestor = range.commonAncestorContainer;
        
        // Определяем граничные узлы и смещения
        const startContainer = range.startContainer;
        const startOffset = range.startOffset;
        const endContainer = range.endContainer;
        const endOffset = range.endOffset;
        
        // Создаем TreeWalker для поиска текстовых узлов в пределах общего предка
        const walker = document.createTreeWalker(
            commonAncestor,
            NodeFilter.SHOW_TEXT,
            null
        );
        
        let currentNode = walker.nextNode();
        let foundStart = false;
        
        while (currentNode) {
            const textNode = currentNode as Text;
            
            // Проверяем, находится ли текстовый узел в допустимом родительском элементе
            const parentElement = textNode.parentElement;
            if (parentElement && parentElement.closest('p, li, h2, h3')) {
                
                // Если мы еще не нашли начальный узел
                if (!foundStart) {
                    // Проверяем, является ли текущий узел начальным
                    if (textNode === startContainer) {
                        foundStart = true;
                    }
                    // Или если начальный узел является потомком текущего узла (для элементов)
                    else if (startContainer.nodeType === Node.ELEMENT_NODE && 
                            textNode.compareDocumentPosition(startContainer) & Node.DOCUMENT_POSITION_CONTAINS) {
                        foundStart = true;
                    }
                }
                
                // Если нашли начальный узел, добавляем диапазон
                if (foundStart) {
                    const nodeRange = document.createRange();
                    
                    let rangeStart = 0;
                    let rangeEnd = textNode.textContent?.length || 0;
                    
                    // Если это начальный узел
                    if (textNode === startContainer) {
                        rangeStart = startOffset;
                    }
                    
                    // Если это конечный узел
                    if (textNode === endContainer) {
                        rangeEnd = endOffset;
                    }
                    // Или если конечный узел является потомком текущего узла
                    else if (endContainer.nodeType === Node.ELEMENT_NODE && 
                            textNode.compareDocumentPosition(endContainer) & Node.DOCUMENT_POSITION_CONTAINS) {
                        rangeEnd = endOffset;
                    }
                    
                    // Создаем диапазон только если есть пересечение
                    if (rangeStart < rangeEnd) {
                        nodeRange.setStart(textNode, rangeStart);
                        nodeRange.setEnd(textNode, rangeEnd);
                        ranges.push(nodeRange);
                    }
                    
                    // Если это конечный узел, выходим из цикла
                    if (textNode === endContainer || 
                        (endContainer.nodeType === Node.ELEMENT_NODE && 
                        textNode.compareDocumentPosition(endContainer) & Node.DOCUMENT_POSITION_CONTAINS)) {
                        break;
                    }
                }
            }
            currentNode = walker.nextNode();
        }
        return ranges;
    };
    
    const toggleClass = (range: Range, newClass: string) => {
        const Container: Element | null = getNodeElement(range.commonAncestorContainer)
        const elems: ChildNode[] = []
        if(!Container) return elems
        const severalBlocks = Container.querySelectorAll(paragraph + ', li').length > 1;
        if(severalBlocks){
            const ranges = getRanges(range)
            for(let range of ranges){
                const frgmts = iterating(range, newClass)
                if(frgmts){
                    elems.push(...frgmts)
                }
            }
        }
        else{
            const frgmts = iterating(range, newClass)
            if(frgmts){
                elems.push(...frgmts)
            }
        }
        return elems
    }

    const iterating = (range: Range, newClass: string) => {
        const startNode = getSpanOrTextNode(range.startContainer);
        const endNode = getSpanOrTextNode(range.endContainer);

        let elementClasses: TElementClass[] = [];

        if((startNode === endNode)){  // text(x2) or span(x2)
            if(startNode.nodeType === Node.TEXT_NODE){
                elementClasses = textSplit(range, newClass)
            }
            else{
                const elem = startNode as Element
                if(selectionClasses[newClass] && !elem.className.includes(newClass)){
                    return
                }
                elementClasses = spanSplit(range, newClass, elem)
            }
        }
        else {
            elementClasses = getElementClasses(range, newClass)
        }
        const fragments = createFragments(elementClasses)
        range.deleteContents()
        const elems = Array.from(fragments.childNodes)
        range.insertNode(fragments)
        return elems
    }
    
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        if (contentRef.current) {
            handlePasteTextOnly(e, contentRef.current);
        }
    };

    const handlePasteTextOnly = (e: ClipboardEvent, element: HTMLElement): void => {
        e.preventDefault();
        
        // Получаем текст из буфера обмена
        const clipboardData = e.clipboardData;
        if (!clipboardData) return;
        
        let text = '';
        
        // Пробуем получить текст из разных форматов
        if (clipboardData.types.includes('text/plain')) {
            text = clipboardData.getData('text/plain');
        } else if (clipboardData.types.includes('Text')) {
            text = clipboardData.getData('Text');
        } else if (clipboardData.types.includes('text/html')) {
            // Если есть только HTML, парсим его для извлечения текста
            const html = clipboardData.getData('text/html');
            text = extractTextFromHTML(html);
        }
        
            if (text.trim()) {
                insertPlainTextAtCursor(text, element);
            }
    };

    const extractTextFromHTML = (html: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Удаляем все теги, оставляя только текст
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const insertPlainTextAtCursor = (text: string, element: HTMLElement): void => {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) {
            // Если нет выделения, добавляем текст в конец
            appendTextToElement(text, element);
            return;
        }
        
        const range = selection.getRangeAt(0);
        
        // Проверяем, что курсор находится внутри нашего элемента
        if (!element.contains(range.commonAncestorContainer)) {
            appendTextToElement(text, element);
            return;
        }
        
        // Удаляем выделенный текст (если есть)
        range.deleteContents();
        
        // Создаем текстовый узел и вставляем его
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        
        // Перемещаем курсор после вставленного текста
        range.setStartAfter(textNode);
        range.collapse(true);
        
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Триггерим событие input для React
        element.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const appendTextToElement = (text: string, element: HTMLElement): void => {
        // Если элемент пустой
        if (!element.textContent && !element.children.length) {
            element.textContent = text;
        } else {
            // Добавляем текст в конец
            const textNode = document.createTextNode(text);
            element.appendChild(textNode);
            
            // Перемещаем курсор в конец
            const range = document.createRange();
            const selection = window.getSelection();
            
            range.selectNodeContents(element);
            range.collapse(false);
            
            if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            }
        }
        
        element.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const [visible, setVisible] = useState<boolean>(false)
    const [opacity, setOpacity] = useState<boolean>(false)
    const [top, setTop] = useState<number>(0)

    useEffect(() => {
        newP()
    }, [])

    const onClick = (e: MouseEvent) => {  
        setVisibleParagraphSelection()
    }   

    const onFocus = () => {
        setVisibleParagraphSelection()
    }

    return (
        <section 
            className={classes.container}
            ref={containerRef}
        >
            <HeaderChange 
                contentRef={contentRef} 
                range={currentSel}
                getRange={getRange}
                newSelection={newSelection}
                selectionClasses={selectionClasses}
                newRange={newRange}
                selectedFigure={selectedFigure}
                setSelectedFigure={setSelectedFigure}
            />
            <section className={classes.wrap}>
                <div 
                    id="blog_change"
                    contentEditable 
                    onMouseUp={onMouseUp}
                    onMouseDown={onMouseUp}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onClick={onClick}
                    onFocus={onFocus}
                    onPaste={handlePaste}
                    className={classes.content}
                    ref={contentRef}
                    data-placeholder="Начните свой рассказ прямо сейчас..."
                    content={blog.body}
                >
                </div>
                <NewParagraph 
                    visible={visible}
                    top={top}
                    opacity={opacity}
                    containerRef={containerRef}
                    contentRef={contentRef} 
                    currrentElem={currentElem}
                    onSelected={newRange}
                    setSelectedFigure={setSelectedFigure}
                />
            </section>
        </section>
    )
}