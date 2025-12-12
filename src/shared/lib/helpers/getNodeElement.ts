


export function getNodeElement(node: Node): Element | null {
    return (
        node.nodeType === Node.ELEMENT_NODE 
            ? 
        node as Element 
            : 
        node.parentElement
    )
}