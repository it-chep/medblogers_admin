import { getNodeElement } from "../../../../shared/lib/helpers/getNodeElement";


export function getCurrentRange(range: Range, parentElem: Element) {
    let startOffset: number | null = null;
    let startContainer: Element | null = null;
    const date = Date.now()
    startOffset = range.startOffset
    startContainer = getNodeElement(range.startContainer)
    if(startContainer !== parentElem){
        startContainer?.setAttribute('range_id', String(date))
    }
    return {startOffset, startContainer, date}
}