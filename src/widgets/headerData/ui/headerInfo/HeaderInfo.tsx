import { FC, useEffect, useRef } from "react";
import classes from './headerInfo.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { MyButton } from "../../../../shared/ui/myButton";
import { useNavigate } from "react-router-dom";
import { BLOGS_ROUTE } from "../../../../app/router/routes";
import { decoder } from "../../../../shared/lib/helpers/decoder";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { ButtonBlock } from "../../../../shared/ui/buttonBlock/ButtonBlock";
import { MyInput } from "../../../../shared/ui/myInput";
import { blogService, useBlogActions } from "../../../../entities/blog";
import { AuthError } from "../../../../shared/err/AuthError";
import { useUserActions } from "../../../../entities/user";


export const HeaderInfo: FC = () => {

    const {blog} = useAppSelector(s => s.blogReducer)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setTitle} = useBlogActions()
    const saveId = useRef<NodeJS.Timer | null>(null)
    const {setIsAuth} = useUserActions()

    const router = useNavigate()

    const back = () => {
        router(BLOGS_ROUTE.path)
    }

    const save = async (message: boolean) => {
        try{
            const elem = document.getElementById("blog_change")
            if(elem){
                const body = decoder(elem)
                await blogService.updateBlog(blog, body)
                if(message){
                    setGlobalMessage({type: 'ok', message: 'Сохранено'})
                }
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при сохранении статьи', type: 'error'})
            }
            if(saveId.current){
                clearInterval(saveId.current)
            }
        }
        finally{

        }
    }

    useEffect(() => {
        if(!saveId.current){
            const id = setInterval(() => save(false), 5000)
            saveId.current = id;
        }
        
        return () => {
            if(saveId.current){
                clearInterval(saveId.current)
            }
        }
    }, [])

    return (
        <section className={classes.container}>
            <ButtonBlock 
                onClick={back}
            />
            <section className={classes.titleBox}>
                <MyInput
                    value={blog.title}
                    setValue={setTitle}
                    sign="Статья"
                />
            </section>
            <section className={classes.save}>
                <MyButton onClick={() => save(true)}>
                    Сохранить
                </MyButton>
            </section>
        </section>
    )
}