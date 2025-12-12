export const encoder = (htmlString: string): string => {
    // Создаем временный контейнер для парсинга HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;
    
    // ВОССТАНОВЛЕНИЕ contenteditable атрибута для figcaption
    const figcaptions = tempContainer.querySelectorAll('figcaption');
    figcaptions.forEach(figcaption => {
        figcaption.setAttribute('contenteditable', 'true');
    });
    
    // ВОССТАНОВЛЕНИЕ структуры figure > section > iframe
    const figuresWithIframe = tempContainer.querySelectorAll('figure > iframe');
    
    figuresWithIframe.forEach(iframe => {
        const figure = iframe.parentElement;
        
        if (figure && figure.tagName.toLowerCase() === 'figure') {
            // Создаем section
            const section = document.createElement('section');
            section.classList.add('video-edit')
            // Переносим iframe в section
            section.appendChild(iframe.cloneNode(true));
            // Заменяем iframe на section с iframe внутри
            figure.replaceChild(section, iframe);
        }
    });
    
    // ПРЕОБРАЗОВАНИЕ ССЫЛОК обратно в элементы с data-href
    const links = tempContainer.querySelectorAll('a[href]');
    
    links.forEach(link => {
        // Создаем элемент для замены (оригинальный элемент)
        const originalElement = document.createElement('span');
        originalElement.setAttribute('data-href', (link as HTMLAnchorElement).href);
        
        // Копируем содержимое ссылки
        while (link.firstChild) {
            originalElement.appendChild(link.firstChild);
        }
        
        // Копируем классы
        link.classList.forEach(className => {
            originalElement.classList.add(className);
        });
        
        // Добавляем класс link
        originalElement.classList.add('link');
        
        // Копируем другие атрибуты
        Array.from(link.attributes).forEach(attr => {
            if (attr.name !== 'href' && attr.name !== 'class' && attr.name !== 'target') {
                originalElement.setAttribute(attr.name, attr.value);
            }
        });
        
        // Заменяем ссылку на элемент с data-href
        link.parentNode?.replaceChild(originalElement, link);
    });
    
    return tempContainer.innerHTML;
};