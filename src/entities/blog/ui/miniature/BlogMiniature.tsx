import { FC } from "react";
import classes from './miniature.module.scss'
import { IBlogMiniature } from "../../model/types";


interface IProps {
    blog: IBlogMiniature;
}

export const BlogMiniature: FC<IProps> = ({blog}) => {

    return (
        <section className={classes.container}>
            <section className={classes.imageBox}>
                {
                    blog.imageUrl
                        &&
                    <img src={blog.imageUrl} />
                }
            </section>
            <section className={classes.wrap}>
                <section className={classes.date}>
                    {blog.date}
                </section>
                <section className={classes.title}>
                    {blog.title}
                </section>
                <section className={classes.description}>
                    {blog.previewText}
                </section>
                <section className={classes.button}>
                    Читать статью
                </section>
            </section>
        </section>
    )
}