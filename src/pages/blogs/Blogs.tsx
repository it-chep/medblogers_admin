import classes from './blogs.module.scss'
import { Blogs } from "../../widgets/blogs";
import { CreateBlog } from "../../features/createBlog";


export default function BlogsPage() {

    return (
        <section className={classes.container + " wrapper_main"}>
            
            <section className={classes.header}>
                <h1>
                    Список статей
                </h1>
                <CreateBlog />
            </section>
            <Blogs />
        </section>
    )
}