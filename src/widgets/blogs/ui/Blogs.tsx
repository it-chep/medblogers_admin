import { FC, useEffect, useState } from "react";
import { BlogItem, blogService, IBlogItem } from "../../../entities/blog";
import classes from './blogs.module.scss'
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { ChangeBlogActive } from "../../../features/changeBlogActive";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";

export const Blogs: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [blogs, setBlogs] = useState<IBlogItem[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const blogsRes = await blogService.getBlogs()
            setBlogs(blogsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка статей', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const setIsActive = (blogId: string) => {
        return (isActive: boolean) => {
            setBlogs(blogs => blogs.map(blog => {
                if(blog.blogId === blogId){
                    blog.isActive = isActive;
                }
                return blog
            }))
        }
    }

    return (
        <section className={classes.container}>   
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                blogs.length > 0
                    &&
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.item}>
                            <th>№</th>
                            <th>UUID</th>
                            <th>Название статьи</th>
                            <th>Порядковый номер</th>
                            <th>Статус публикации</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={classes.list}>
                        {blogs.map((blog, ind) => 
                            <BlogItem 
                                ind={ind + 1} 
                                key={blog.blogId} 
                                blogItem={blog}
                            >
                                <section className={classes.features}>
                                    <ChangeBlogActive 
                                        blogId={blog.blogId}
                                        isActive={blog.isActive}
                                        setIsActive={setIsActive(blog.blogId)}
                                        useImageId={false}
                                    />
                                </section>
                            </BlogItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}