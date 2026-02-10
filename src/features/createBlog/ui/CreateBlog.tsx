import { FC, useState } from "react";
import { PlusSvg } from "../../../shared/lib/assets/plus/PlusSvg";
import { Modal } from "../../../shared/ui/modal";
import classes from './createBlog.module.scss'
import { MyInput } from "../../../shared/ui/myInput";
import { MyButton } from "../../../shared/ui/myButton";
import { blogService } from "../../../entities/blog";
import { useNavigate } from "react-router-dom";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";


export const CreateBlog: FC = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const {setIsLoading} = useGlobalLoadingActions()
    const router = useNavigate()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const onCreate = async () => {
        try{
            setIsLoading(true)
            const blogIdRes = await blogService.createBlog(title, slug)
            router('/blogs/' + blogIdRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else if(e instanceof Error){
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при создании статьи', type: 'error'})
            }
        }
        finally{
            setOpen(false)
            setTitle('')
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <PlusSvg onClick={() => setOpen(!open)} />
            <Modal open={open} setOpen={setOpen}>
                <section className={classes.content}>
                    <MyInput
                        value={title} 
                        setValue={setTitle} 
                        placeholder="Введите название статьи" 
                    />
                    <MyInput
                        value={slug} 
                        setValue={setSlug} 
                        placeholder="Введите slug статьи" 
                    />
                    <section className={classes.button}>
                        <MyButton onClick={onCreate}>
                            Создать
                        </MyButton> 
                    </section>
                </section>
            </Modal>
        </section>
    )
}