

export const getPrimaryImageId = (elem: Element): string | null => {
    const img = elem.querySelector('img')
    if(img){
        const imgId = img.dataset.id
        return imgId || null
    }
    else{
        return null
    }
}