import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import { encoder } from "../../../shared/lib/helpers/encoder";
import { Navigate } from "react-router-dom";
import { BLOGS_ROUTE } from "../../../app/router/routes";
import classes from './blogPreview.module.scss'
import { decoder } from "../../../shared/lib/helpers/decoder";
import { ButtonBlock } from "../../../shared/ui/buttonBlock/ButtonBlock";
import { BlogMiniature, useBlogActions } from "../../../entities/blog";

interface IProps {
    setIsPreview: (isPreview: boolean) => void;
}

export const BlogPreview: FC<IProps> = ({setIsPreview}) => {

    const {blog} = useAppSelector(s => s.blogReducer)
    const {setBody} = useBlogActions()

    if(!blog.blogId){
        return <Navigate to={BLOGS_ROUTE.path} />
    }

    const elem = document.getElementById('blog_change')
    let body = ''
    if(elem){
        body = decoder(elem)
    }

    const imagePreview = elem?.querySelector('img')

    const date = (new Date()).toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
    const time = (new Date()).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
    });

    const back = () => {
        const bodyEncoder = encoder(body)
        setBody(bodyEncoder)
        setIsPreview(false)
    }

    return (
        <section className={classes.wrapper + " wrapper_main"}>
            <section className={classes.container}>
                <section className={classes.header}>
                    <ButtonBlock 
                        onClick={back}
                    />
                </section>
                <section className={classes.wrap}>
                    <section className={classes.date}>
                        {date.slice(0, -3)}, {time}
                    </section>
                    <section className={classes.content}>
                        <h1>{blog.title}</h1>
                        
                        <section 
                            dangerouslySetInnerHTML={{ __html: body }} 
                        />
                    </section>
                </section>
            </section>
            <section className={classes.miniature}>
                {
                    "123".split('').map(i => 
                        <BlogMiniature 
                            key={i}
                            blog={{
                                blogId: blog.blogId,
                                title: blog.title,
                                previewText: blog.previewText,
                                imageUrl: imagePreview?.src || "",
                                date: '26 декабря 2025'
                            }}
                        />
                    )
                }
            </section>
        </section>
    )
}