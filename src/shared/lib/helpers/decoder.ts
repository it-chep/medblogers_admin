


export const decoder = (elem: Element, deleteLastP?: boolean): string => {
    // Создаем глубокую копию элемента
    const clonedElem = elem.cloneNode(true) as Element;
    
    // УДАЛЕНИЕ АТРИБУТА: находим все figcaption с contenteditable="true" и удаляем только атрибут
    const editableFigcaptions = clonedElem.querySelectorAll('figcaption[contenteditable="true"]');
    
    // Обрабатываем элементы
    editableFigcaptions.forEach(figcaption => {
        // Удаляем только атрибут contenteditable
        figcaption.removeAttribute('contenteditable');
    });
    
    // Также обрабатываем другие варианты записи атрибута
    const otherEditableFigcaptions = clonedElem.querySelectorAll(`
        figcaption[contenteditable=""],
        figcaption[contenteditable]
    `);
    
    otherEditableFigcaptions.forEach(figcaption => {
        figcaption.removeAttribute('contenteditable');
    });
    
    // ОБРАБОТКА figure > section > iframe: удаляем section, оставляя iframe внутри figure
    const figureWithSection = clonedElem.querySelectorAll('figure > section > iframe');
    
    figureWithSection.forEach(iframe => {
        const section = iframe.parentElement;
        const figure = section?.parentElement;
        
        if (section && figure && section.tagName.toLowerCase() === 'section') {
            // Переносим iframe из section в figure
            figure.insertBefore(iframe, section);
            // Удаляем пустой section
            figure.removeChild(section);
        }
    });
    
    // ПРЕОБРАЗОВАНИЕ ССЫЛОК: находим все элементы с атрибутом data-href внутри клона
    const elementsWithDataHref = clonedElem.querySelectorAll('[data-href]');
    
    // Обрабатываем элементы в обратном порядке (чтобы избежать проблем с изменением DOM)
    for (let i = elementsWithDataHref.length - 1; i >= 0; i--) {
        const element = elementsWithDataHref[i] as HTMLElement;
        const href = element.getAttribute('data-href');
        
        if (!href) continue;
        
        // Создаем ссылку <a>
        const linkElement = document.createElement('a');
        linkElement.href = href;
        linkElement.target = '_blank';
        
        // Переносим содержимое элемента в ссылку
        while (element.firstChild) {
            linkElement.appendChild(element.firstChild);
        }
        
        // Копируем классы (кроме link, если он есть)
        element.classList.forEach(className => {
            if (className !== 'link') {
                linkElement.classList.add(className);
            }
        });
        
        // Копируем другие атрибуты (кроме data-href)
        Array.from(element.attributes).forEach(attr => {
            if (attr.name !== 'data-href' && attr.name !== 'class') {
                linkElement.setAttribute(attr.name, attr.value);
            }
        });
        
        // Заменяем элемент на ссылку
        element.parentNode?.replaceChild(linkElement, element);
    }

    if(deleteLastP){

        const allChildren = Array.from(clonedElem.children);
        
        // Идем с конца массива детей
        for (let i = allChildren.length - 1; i >= 0; i--) {
            const child = allChildren[i];
            if ((child.tagName.toLowerCase() === 'p')) {
                // Проверяем, пустой ли он (учитываем пробелы, переносы строк)
                const hasContent = child.textContent!.trim().length > 0;
                
                // Если параграф пустой - удаляем его
                if (!hasContent) {
                    clonedElem.removeChild(child);
                } else {
                    // Как только нашли непустой элемент - прекращаем удаление
                    break;
                }
            } else {
                console.log(333, child)
                // Как только нашли не-p элемент - прекращаем удаление
                break;
            }
        }
    }
    
    // Возвращаем innerHTML клонированного элемента
    return clonedElem.innerHTML;
};