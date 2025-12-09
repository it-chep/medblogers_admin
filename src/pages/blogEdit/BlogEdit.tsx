import { useEffect, useState } from "react";
import { HeaderData } from "../../widgets/headerData";
import classes from './blogEdit.module.scss'
import { ChangeBlog } from "../../features/changeBlog";
import { LoaderSpinner } from "../../shared/ui/spinner";
import { blogService, useBlogActions } from "../../entities/blog";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { AuthError } from "../../shared/err/AuthError";
import { useUserActions } from "../../entities/user";
import { useGlobalMessageActions } from "../../entities/globalMessage";
import { BlogPreview } from "../../widgets/blogPreview";

export default function BlogEditPage() {

    const {id} = useParams<{id: string}>()
    const {blog} = useAppSelector(s => s.blogReducer)
    const {setBlog} = useBlogActions()
    const [isLoading, setIsLoading] = useState<boolean>(!blog.body)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const [isPreview, setIsPreview] = useState<boolean>(false)

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const blogRes = await blogService.getBlog(id)
                setBlog(blogRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении статьи', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.container + " wrapper_main"}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                isPreview
                    ?
                <BlogPreview 
                    setIsPreview={setIsPreview} 
                />
                    :
                <section className={classes.content}>
                    <HeaderData  
                        setIsPreview={setIsPreview}
                    />
                    <ChangeBlog />
                </section>
            }
        </section>
    )
}