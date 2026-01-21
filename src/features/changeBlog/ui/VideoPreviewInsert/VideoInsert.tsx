import { FC, useState } from "react";
import classes from './videoInsert.module.scss'
import { LinkInput } from "../linkInput/LinkInput";
import { setPointer } from "../../../../shared/lib/helpers/setPointer";

export type TVideoPlatform = 'vk' | 'youtube' | 'kinescope' | 'rutube';

interface VideoInsertProps {
    onInsert: (figure: HTMLElement) => void;
    setShowVideoInput: (show: boolean) => void;
    platform: TVideoPlatform;
    setSelectedFigure: (selectedFigure: string) => void;
}


export const figureClickHandler = (
    section: HTMLElement, figure: HTMLElement, setSelectedFigure: (selectedFigure: string) => void
) => {
    const figureHandler = (e: MouseEvent) => {
        section.removeEventListener('click', figureHandler)

        const id = 'video_' + Date.now()
        if(id){
            section.setAttribute('data-id', id)
            setSelectedFigure(id)
            figure.classList.add(classes.selected)
        }
                    
        const docHandler = (e: MouseEvent) => {
            const target = e.target as Element;
        
            if(!target.closest(`[data-id="${id}"]`)){
                if(!target.closest('figure') || (target.tagName === 'FIGCAPTION')){
                    setSelectedFigure('')
                }
                figure.classList.remove(classes.selected)
                section.addEventListener('click', figureHandler)
                document.removeEventListener('click', docHandler)
            }
        }
        
        document.addEventListener('click', docHandler)
    }
    section.addEventListener('click', figureHandler)
}

export const VideoInsert: FC<VideoInsertProps> = (
    {onInsert, setShowVideoInput, platform, setSelectedFigure}
) => {

    const [url, setUrl] = useState("");

    const extractVKVideoId = (url: string): { ownerId: string, videoId: string } | null => {
        const patterns = [
            /vkvideo\.ru\/video(-?\d+)_(\d+)/,
            /vk\.com\/video(-?\d+)_(\d+)/,
            /m\.vk\.com\/video(-?\d+)_(\d+)/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return { ownerId: match[1], videoId: match[2] };
            }
        }
        return null;
    };

    const extractYouTubeVideoId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
            /youtube\.com\/embed\/([^?]+)/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    };

    const extractKinescopeVideoId = (url: string): string | null => {
        const patterns = [
            /kinescope\.io\/embed\/([a-zA-Z0-9]+)/,
            /kinescope\.io\/([a-zA-Z0-9]+)/,
            /(?:player\.kinescope\.io|kinescope\.io\/player)\/([a-zA-Z0-9]+)/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    };

    const extractRuTubeVideoId = (url: string): string | null => {
        const patterns = [
            /rutube\.ru\/video\/([a-zA-Z0-9]+)\/?/,
            /rutube\.ru\/play\/embed\/([a-zA-Z0-9]+)\/?/,
            /rutube\.ru\/embed\/([a-zA-Z0-9]+)\/?/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    };

    const isValidUrl = () => {
        switch (platform) {
            case 'vk':
                return extractVKVideoId(url) !== null;
            case 'youtube':
                return extractYouTubeVideoId(url) !== null;
            case 'kinescope':
                return extractKinescopeVideoId(url) !== null;
            case 'rutube':
                return extractRuTubeVideoId(url) !== null;
            default:
                return false;
        }
    };

    const getErrorMessage = (): string => {
        switch (platform) {
            case 'vk':
                return "Некорректная ссылка VK видео";
            case 'youtube':
                return "Некорректная ссылка YouTube видео";
            case 'kinescope':
                return "Некорректная ссылка Kinescope видео";
            case 'rutube':
                return "Некорректная ссылка RuTube видео";
            default:
                return "Некорректная ссылка на видео";
        }
    };

    const getIframeSrc = (): string | null => {
        switch (platform) {
            case 'vk':
                const vkData = extractVKVideoId(url);
                return vkData ? `https://vk.com/video_ext.php?oid=${vkData.ownerId}&id=${vkData.videoId}` : null;
            case 'youtube':
                const ytId = extractYouTubeVideoId(url);
                return ytId ? `https://www.youtube.com/embed/${ytId}` : null;
            case 'kinescope':
                const kinescopeId = extractKinescopeVideoId(url);
                return kinescopeId ? `https://kinescope.io/embed/${kinescopeId}` : null;
            case 'rutube':
                const rutubeId = extractRuTubeVideoId(url);
                return rutubeId ? `https://rutube.ru/play/embed/${rutubeId}` : null;
            default:
                return null;
        }
    };

    const getIframeAttributes = (): Record<string, string> => {
        const baseAttributes = {
            src: getIframeSrc() || '',
            width: '100%',
            height: '100%',
            frameborder: '0',
            allowfullscreen: '',
            style: 'width: 100%; height: 100%; border-radius: 8px; border: none;'
        };

        // Добавляем дополнительные атрибуты для RuTube
        if (platform === 'rutube') {
            return {
                ...baseAttributes,
                allow: 'fullscreen',
                title: 'RuTube video player'
            };
        }

        return baseAttributes;
    };

    const handleInsert = () => {
        if(!isValidUrl()){
            alert(getErrorMessage());
            return;
        }

        const iframeSrc = getIframeSrc();
        if (!iframeSrc) {
            alert(getErrorMessage());
            return;
        }

        const figure = document.createElement('figure')
        figure.style.aspectRatio = '16/9'
        figure.setAttribute('contenteditable', "false")    

        const section = document.createElement('section')
        section.classList.add('video-edit')
        figure.append(section)

        // Создаем iframe с нужными атрибутами
        const iframe = document.createElement('iframe')
        const attributes = getIframeAttributes()
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'style') {
                iframe.style.cssText = value
            } else if (key === 'allowfullscreen') {
                iframe.setAttribute('allowfullscreen', value)
            } else {
                iframe.setAttribute(key, value)
            }
        })

        section.appendChild(iframe)
        
        const figcaption = document.createElement('figcaption')
        figcaption.setAttribute('contenteditable', "true")    
        figure.append(figcaption)

        figureClickHandler(section, figure, setSelectedFigure)

        setTimeout(() => {
            const sel = window.getSelection()
            if(sel){
                setPointer(sel, figcaption)
            }
        })
        onInsert(figure);
        setUrl("");
    }

    return (
        <section className={classes.container}>
            <LinkInput 
                onClose={() => setShowVideoInput(false)}
                onSend={handleInsert}
                value={url}
                setValue={setUrl}
            />
        </section>
    );
};