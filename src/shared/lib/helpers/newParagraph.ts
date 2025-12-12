



export function newParagraph(parentElem: Element, tag: 'p' | 'ul' | 'ol' | 'h2' | 'h3' | 'figure' | 'hr' | 'li') {
    const newP = document.createElement(tag)
    parentElem.insertAdjacentElement('afterend', newP)
    return newP
}