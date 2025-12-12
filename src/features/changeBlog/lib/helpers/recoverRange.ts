


export function recoverRange(
    startContainer: Element | null, startOffset: number | null, sel: Selection | null, 
    li: Element | null, parentElem: Element, newP: Element, date: number
){
    if(startContainer && startOffset && sel){
        const newRange = document.createRange()
        if((startContainer === parentElem) && newP.firstChild){  
            newRange.setStart(li?.firstChild || newP.firstChild, startOffset)
            newRange.setEnd(li?.firstChild || newP.firstChild, startOffset)
        }
        else if(startContainer.firstChild){
            const childElem = newP.querySelector(`[range_id="${date}"]`);  
            
            // после обновления DOM, старые эл-ты не действительны, поэтому добавил атрибут
            if(childElem && childElem.firstChild){
                newRange.setStart(childElem.firstChild, startOffset)
                newRange.collapse(true)
                childElem.removeAttribute('range_id')
            }
        }
        sel.removeAllRanges()
        sel.addRange(newRange)
    }
}