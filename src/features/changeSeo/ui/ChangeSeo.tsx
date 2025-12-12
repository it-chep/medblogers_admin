import { FC, useState } from "react";
import classes from './changeSeo.module.scss'
import { MyTextarea } from "../../../shared/ui/textarea";
import { ISeo, useBlogActions } from "../../../entities/blog";
import { useAppSelector } from "../../../app/store/store";

interface IProps {
    
}

export const ChangeSeo: FC<IProps> = ({}) => {

    const [open, setOpen] = useState<boolean>(false)

    const onClick = () => {
        setOpen(!open)
    }

    const {setPrevTitle, setPrevTitleOG, setPrevAdditional} = useBlogActions()
    const {blog} = useAppSelector(s => s.blogReducer)

    return (
        <section className={classes.container}>
            <section 
                onMouseDown={e => e.preventDefault()} 
                onClick={onClick} 
                className={classes.title}
            >
                SEO
            </section>
            <section 
                className={classes.content + (open ? ` ${classes.open}` : '')}
            >
                <MyTextarea 
                    label="Превью для отображения на сайте"
                    value={blog.previewText}
                    setValue={setPrevTitle}
                />
                <MyTextarea 
                    label="Превью для соц сетей"
                    value={blog.societyPreview}
                    setValue={setPrevTitleOG}
                />
                <MyTextarea 
                    label="Дополнительные теги для SEO"
                    value={blog.additionalSeoText}
                    setValue={setPrevAdditional}
                />
            </section>
        </section>
    )
}