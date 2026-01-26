import {FC, PropsWithChildren, ReactNode, RefObject, useEffect, useState} from "react";
import {Dropdown} from "../../../../shared/ui/dropdown";
import {setPointer} from "../../../../shared/lib/helpers/setPointer";
import {createPortal} from "react-dom";
import {TVideoPlatform, VideoInsert} from "../VideoPreviewInsert/VideoInsert";
import classes from './selectedParagraph.module.scss'
import {H2} from "../../lib/assets/H2";
import {H3} from "../../lib/assets/H3";
import {ListSvg} from "../../lib/assets/ListSvg";
import {ListNumSvg} from "../../lib/assets/ListNumSvg";
import {ImageSvg} from "../../lib/assets/ImageSvg";
import {HrSvg} from "../../lib/assets/HrSvg";
import {VKVideoSvg} from "../../lib/assets/VKVideoSvg";
import {KinescopeSvg} from "../../lib/assets/KinescopeSvg";
import {YouTubeSvg} from "../../lib/assets/YouTubeSvg";
import {blogService} from "../../../../entities/blog";
import {useAppSelector} from "../../../../app/store/store";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { BlockquoteSvg } from "../../lib/assets/Blockquote";
import { RutubeSvg } from "../../lib/assets/Rutube";

interface IProps {
    contentRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    currentElem: Element | null;

    onSelected: () => void;

    open?: boolean;

    setSelectedFigure: (selectedFigure: string) => void;
}

export const SelectedParagraph: FC<IProps & PropsWithChildren> = (
    {
        contentRef, containerRef, onSelected: onSelectedWrap, currentElem, open,
        children, setSelectedFigure
    }
) => {
    const {blog} = useAppSelector(s => s.blogReducer)
    const [showVideoInput, setShowVideoInput] = useState(false);
    const [platform, setPlatform] = useState<TVideoPlatform>('vk');

    const setElem = (currentElem: Element, tag: 'p' | 'ul' | 'ol' | 'h2' | 'h3' | 'figure' | 'hr' | 'blockquote') => {
        const newP = document.createElement(tag)
        currentElem.insertAdjacentElement('beforebegin', newP)
        return newP
    }

    const onList = (type: 'ul' | 'ol') => {
        if (contentRef.current) {
            const sel = window.getSelection()
            if (sel) {
                let list = document.createElement(type);
                if (currentElem) {
                    list = setElem(currentElem, type) as HTMLUListElement | HTMLOListElement
                }
                const li = document.createElement('li')
                list.append(li)

                setPointer(sel, li)
            }
        }
    }

    const onBlockquote = () => {
        const sel = window.getSelection()
        if (sel && currentElem) {
            const newP = setElem(currentElem, 'blockquote')
            setPointer(sel, newP)
        }
    }

    const onP = () => {
        const sel = window.getSelection()
        if (sel && currentElem) {
            const newP = setElem(currentElem, 'p')
            setPointer(sel, newP)
        }
    }

    const onH = (tagName: 'h2' | 'h3') => {
        const sel = window.getSelection()
        if (sel && currentElem) {
            const newP = setElem(currentElem, tagName)
            setPointer(sel, newP)
        }
    }

    const onHr = () => {
        const sel = window.getSelection()
        if (sel && currentElem) {
            const hr = setElem(currentElem, 'hr')
            hr.onclick = (e) => e.preventDefault()
            onP()
        }
    }

    const imgClickHandler = (img: HTMLImageElement) => {
        const imgHandler = () => {
            img.removeEventListener('click', imgHandler)
            const id = img.dataset.id;
            if(id) {
                setSelectedFigure(id)
                img.parentElement?.classList.add(classes.selected)
            }

            const docHandler = (e: MouseEvent) => {
                const target = e.target as Element;
                if(target.closest('#change_header')){
                    return
                }
                if(!target.closest(`img[data-id="${id}"]`)) {
                    if(!target.closest('img')) {
                        setSelectedFigure('')
                    }
                    img.parentElement?.classList.remove(classes.selected)
                    img.addEventListener('click', imgHandler)
                    document.removeEventListener('click', docHandler)
                }
            }
            document.addEventListener('click', docHandler)
        }
        img.addEventListener('click', imgHandler)
    }

    const initImgDelete = () => {
        const imgs = containerRef.current?.querySelectorAll('img')
        imgs?.forEach(img =>
            imgClickHandler(img)
        )
    }

    useEffect(() => {
        if (contentRef.current) {
            setTimeout(initImgDelete)
        }
    }, [])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()

    const sendImage = async (imageData: ArrayBuffer) => {
        try {
            setIsLoading(true)
            const res = await blogService.saveImage(blog.blogId, imageData)
            return res
        } catch (e) {
            if(e instanceof Error){
                setGlobalMessage({type: 'error', message: e.message})
            } 
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const onImage = async () => {
        const SetInDiv = (id: string, url: string) => {
            const img = document.createElement('img')

            imgClickHandler(img)

            img.src = url;
            img.setAttribute('data-id', id)

            const sel = window.getSelection()
            if (sel && currentElem) {
                const newP = setElem(currentElem, 'figure')
                newP.setAttribute('contenteditable', "false")
                newP.append(img)
                const figcaption = document.createElement('figcaption')
                figcaption.setAttribute('contenteditable', "true")
                newP.append(figcaption)
                setPointer(sel, figcaption)
            }
        }

        if ('showOpenFilePicker' in window) {
            try {
                // @ts-ignore - File System Access API
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{
                        description: 'Images',
                        accept: {
                            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
                        }
                    }]
                });

                const file = await fileHandle.getFile();
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const imageData = e.target?.result as ArrayBuffer

                    const data = await sendImage(imageData)
                    if (data) {
                        SetInDiv(data.imageId, data.imageUrl)
                    }
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.log('User cancelled file selection');
            }
        } else {
            alert('File System Access API не поддерживается в вашем браузере');
        }
    }

    const onVideo = (platform: TVideoPlatform) => {
        const sel = window.getSelection()

        if (sel && currentElem && containerRef.current) {
            const newP = setElem(currentElem, 'p')
            const top = newP.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top - 8;
            setTop({top, elem: newP})
            setShowVideoInput(true)
            setPlatform(platform)
        }
    }

    const lists: { paragraph: string, name: string, onClick: () => void, icon: ReactNode }[] = [
        {name: 'Заголовок 2', paragraph: 'h2', onClick: () => onH('h2'), icon: <H2 />},
        {name: 'Заголовок 3', paragraph: 'h3', onClick: () => onH('h3'), icon: <H3 />},
        {name: 'Список', paragraph: 'ul', onClick: () => onList('ul'), icon: <ListSvg />},
        {name: 'Нумерованный список', paragraph: 'ol', onClick: () => onList('ol'), icon: <ListNumSvg />},
        {name: 'Изображение', paragraph: 'img', onClick: onImage, icon: <ImageSvg/>},
        {name: 'Разделитеть', paragraph: 'hr', onClick: onHr, icon: <HrSvg/>},
        {name: 'Цитата', paragraph: 'blockquote', onClick: onBlockquote, icon: <BlockquoteSvg />},
        {name: 'VK Video', paragraph: 'vk', onClick: () => onVideo('vk'), icon: <VKVideoSvg />},
        {name: 'YouTube', paragraph: 'youTube', onClick: () => onVideo('youtube'), icon: <YouTubeSvg />},
        {name: 'Kinescope', paragraph: 'kinescope', onClick: () => onVideo('kinescope'), icon: <KinescopeSvg />},
        {name: 'Rutube', paragraph: 'rutube', onClick: () => onVideo('rutube'), icon: <RutubeSvg />},
    ]

    const onSelected = (name: string) => {
        const target = lists.find(l => l.name === name)
        if (target) {
            target.onClick()
            onSelectedWrap()
        }
    }

    const [top, setTop] = useState<{ top: number, elem: Element | null }>({elem: null, top: 180})

    const handleInsertVideo = (newElem: HTMLElement) => {
        if (!contentRef.current) return;

        if (!top.elem) {
            contentRef.current.append(newElem)
        } else {
            top.elem.insertAdjacentElement('afterend', newElem)
            top.elem.remove()
        }

        if (currentElem) {
            currentElem.insertAdjacentElement('beforebegin', newElem)
        }

        setShowVideoInput(false)
    };

    return (
        <section className={classes.container}>
            <Dropdown
                items={lists.map(l => ({name: l.name, icon: l.icon}))}
                onSelected={onSelected}
                open={open}
            >
                {children}
            </Dropdown>
            {
                contentRef.current && contentRef.current.parentElement && showVideoInput
                    &&
                createPortal(
                    <section
                        className={classes.videoLink}
                        style={{top: top.top}}
                    >
                        <VideoInsert
                            onInsert={handleInsertVideo}
                            setShowVideoInput={setShowVideoInput}
                            setSelectedFigure={setSelectedFigure}
                            platform={platform}
                        />
                    </section>,
                    contentRef.current.parentElement
                )
            }
        </section>
    )
}