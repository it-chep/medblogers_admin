import { FC } from "react";
import { ToggleSwitch } from "../../../shared/ui/toggleSwitch";
import { blogService } from "../../../entities/blog";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { getPrimaryImageId } from "../../../shared/lib/helpers/getPrimaryImageId";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";

interface IProps {
    blogId: string;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

export const ChangeBlogActive: FC<IProps> = ({blogId, isActive, setIsActive}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const change = async (isActive: boolean) => {
        try{
            setIsLoading(true)
            if(isActive){
                const elem = document.getElementById('blog_change')
                if(!elem) throw new Error('Нет редакт блока')
                const imageId = getPrimaryImageId(elem)
                if(!imageId) throw new Error('В статье нет ни одной фотки')
                await blogService.publishBlog(blogId, imageId)
            }
            else{
                await blogService.unPblishBlog(blogId)
            }
            setIsActive(isActive)
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
                setGlobalMessage({message: 'Ошибка при смене статуса публикации', type: 'error'})
            }
            setIsActive(!isActive)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <ToggleSwitch 
            checked={isActive} 
            onSelected={change} 
        />
    )
}