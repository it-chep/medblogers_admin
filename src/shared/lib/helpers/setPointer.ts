



export function setPointer(sel: Selection, elem: Element, start: number = 0) {
    const newRange = document.createRange();
    newRange.setStart(elem, start);
    newRange.collapse(true);
                
    sel.removeAllRanges();
    sel.addRange(newRange);
}