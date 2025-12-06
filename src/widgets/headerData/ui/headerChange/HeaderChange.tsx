import { FC } from "react";
import classes from './headerChange.module.scss'
import { useBlogActions } from "../../../../entities/blog";
import { useAppSelector } from "../../../../app/store/store";
import { ChangeSeo } from "../../../../features/changeSeo";
import { MyInput } from "../../../../shared/ui/myInput";
import { ChangeBlogActive } from "../../../../features/changeBlogActive";
import { getPrimaryImageId } from "../../../../shared/lib/helpers/getPrimaryImageId";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";

interface IProps {
    setIsPreview: (isPreview: boolean) => void;
}

export const HeaderChange: FC<IProps> = ({setIsPreview}) => {

    const {blog} = useAppSelector(s => s.blogReducer)
    const {setOrderingNumber, setSlug, setIsActive} = useBlogActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const onPreview = () => {   
        const elem = document.getElementById('blog_change')
        if(!elem) {
            setGlobalMessage({type: 'error', message: 'Нет редакт блока'})
            return
        }
        const imageId = getPrimaryImageId(elem)
         if(!imageId) {
            setGlobalMessage({type: 'error', message: 'В статье нет ни одной фотки'})
            return
        }
        setIsPreview(true)
    }

    return (
        <section className={classes.container}>
            <ChangeSeo />
            <section className={classes.orderingNumber}>
                <MyInput 
                    sign="Порядковый номер статьи: " 
                    typeInput="number" 
                    value={String(blog.orderingNumber)} 
                    setValue={setOrderingNumber} 
                />
            </section>
            <section className={classes.slug}>
                <MyInput 
                    sign="Слаг: " 
                    value={blog.slug} 
                    setValue={setSlug} 
                />
            </section>
            <svg className={classes.preview} onClick={onPreview} id="svg" fill="#F2F2F2" stroke="#F2F2F2" width="36" height="36" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg">
                <g id="IconSvg_bgCarrier" strokeWidth="0"></g>
                <g id="IconSvg_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0">
                    <g xmlns="http://www.w3.org/2000/svg">
                        <path d="m629.78 392.84c-4.1719-5.4336-103.68-133.82-229.79-133.82-126.11 0-225.61 128.39-229.78 133.82-3.2305 4.2305-3.2305 10.098 0 14.324 4.1719 5.4336 103.68 133.82 229.79 133.82s225.61-128.55 229.79-133.82h-0.003906c3.2305-4.2266 3.2305-10.094 0-14.324zm-229.78 124.69c-98.164 0-182.63-91-205.14-117.53 22.512-26.531 106.98-117.53 205.14-117.53s182.63 91 205.14 117.53c-22.516 26.527-106.98 117.53-205.14 117.53z"></path>
                        <path d="m400 306.64c-24.762 0-48.508 9.8359-66.02 27.344-17.508 17.512-27.344 41.258-27.344 66.02 0 24.758 9.8359 48.508 27.344 66.016 17.512 17.508 41.258 27.344 66.02 27.344 24.758 0 48.508-9.8359 66.016-27.344s27.344-41.258 27.344-66.016c-0.019531-24.758-9.8633-48.492-27.367-65.996-17.504-17.504-41.238-27.348-65.992-27.367zm0 163.11c-18.5 0-36.238-7.3516-49.32-20.43-13.078-13.078-20.426-30.82-20.426-49.316 0-18.5 7.3477-36.238 20.426-49.32 13.082-13.078 30.82-20.426 49.32-20.426 18.496 0 36.238 7.3477 49.316 20.426 13.078 13.082 20.43 30.82 20.43 49.32-0.042969 18.484-7.4062 36.199-20.477 49.27-13.07 13.07-30.785 20.434-49.27 20.477z"></path>
                    </g>
                </g>
                <g id="IconSvg_iconCarrier">
                    <g xmlns="http://www.w3.org/2000/svg">
                        <path d="m629.78 392.84c-4.1719-5.4336-103.68-133.82-229.79-133.82-126.11 0-225.61 128.39-229.78 133.82-3.2305 4.2305-3.2305 10.098 0 14.324 4.1719 5.4336 103.68 133.82 229.79 133.82s225.61-128.55 229.79-133.82h-0.003906c3.2305-4.2266 3.2305-10.094 0-14.324zm-229.78 124.69c-98.164 0-182.63-91-205.14-117.53 22.512-26.531 106.98-117.53 205.14-117.53s182.63 91 205.14 117.53c-22.516 26.527-106.98 117.53-205.14 117.53z"></path>
                        <path d="m400 306.64c-24.762 0-48.508 9.8359-66.02 27.344-17.508 17.512-27.344 41.258-27.344 66.02 0 24.758 9.8359 48.508 27.344 66.016 17.512 17.508 41.258 27.344 66.02 27.344 24.758 0 48.508-9.8359 66.016-27.344s27.344-41.258 27.344-66.016c-0.019531-24.758-9.8633-48.492-27.367-65.996-17.504-17.504-41.238-27.348-65.992-27.367zm0 163.11c-18.5 0-36.238-7.3516-49.32-20.43-13.078-13.078-20.426-30.82-20.426-49.316 0-18.5 7.3477-36.238 20.426-49.32 13.082-13.078 30.82-20.426 49.32-20.426 18.496 0 36.238 7.3477 49.316 20.426 13.078 13.082 20.43 30.82 20.43 49.32-0.042969 18.484-7.4062 36.199-20.477 49.27-13.07 13.07-30.785 20.434-49.27 20.477z"></path>
                    </g>
                </g>
            </svg>
            <section className={classes.isActive}>
                <section>Статус публикации</section>
                <ChangeBlogActive
                    blogId={blog.blogId}
                    setIsActive={setIsActive}
                    isActive={blog.isActive}
                    useImageId={true}
                />
            </section>
        </section>
    )
}