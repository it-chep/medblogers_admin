import { FC, useEffect, useState } from "react";
import classes from './changeCategories.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { blogService, IBlogCategory, useBlogActions } from "../../../entities/blog";
import { useAppSelector } from "../../../app/store/store";
import { SelectedItem } from "../../../shared/ui/selectedItem";

interface IProps {

}

export const ChangeCategories: FC = () => {

    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<IBlogCategory[]>([])
    const {setCategory, deleteCategory} = useBlogActions()
    const {blog} = useAppSelector(s => s.blogReducer)

    const getCategories = async () => {
        try{
            setIsLoading(true)
            const categoriesRes = await blogService.getCategories()
            setCategories(categoriesRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении категорий', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const changeCategoryWrap = (add: boolean) => {
        return async (item: IBlogCategory) => {
            try{
                setIsLoading(true)
                if(add){
                    await blogService.addCategory(blog.blogId, item.id)
                    setCategory(item)
                }
                else{
                    await blogService.deleteCategory(blog.blogId, item.id)
                    deleteCategory(item.id)
                }
            }
            catch(e){
                console.log(e)
                if(e instanceof AuthError){
                    setIsAuth(false)
                    setGlobalMessage({message: e.message, type: 'error'})
                }
                else{
                    setGlobalMessage({message: 'Ошибка при изменении категорий', type: 'error'})
                }
            }
            finally{
                setIsLoading(false)
            }
        }
    }
    

    return (
        <section className={classes.container}>
            <SelectedItem 
                title="Выбрать категории"
                items={categories}
                onSelected={changeCategoryWrap(true)}
                onDelete={changeCategoryWrap(false)}
                selectedItems={blog.categories}
                isLoading={isLoading}
            />
        </section>
    )
}