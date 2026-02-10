import { FC, useState } from "react";
import classes from './addDoctorsCities.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/myInput";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { doctorService } from "../../../entities/doctor";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/err/AuthError";

export const AddDoctorsCities: FC = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<string>('')
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const {setIsLoading} = useGlobalLoadingActions()

    const checkEmpty = (): boolean => {
        if(!city) {
            setError('Пустое поле')
            return true
        }
        return false
    }

    const addReq = async () => {
        try {
            setIsLoading(true)
            await doctorService.addCity(city)
            window.location.reload()
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при создании города', type: 'error'})
            }
        } finally {
            setIsLoading(false)
            setOpen(false)
            setCity('')
        }
    }

    const add = () => {
        const isEmpty = checkEmpty()
        if(!isEmpty){
            addReq()
        }
    }

    return (
        <>
            <MyButton onClick={() => setOpen(true)}>
                Добавить город
            </MyButton>
            <Modal open={open} setOpen={setOpen}>
                <section className={classes.content}>
                    <MyInput 
                        setError={setError}
                        error={error} 
                        value={city} 
                        setValue={setCity} 
                        placeholder="Название города" 
                    />
                    <section className={classes.add}>
                        <MyButton onClick={add}>
                            Создать
                        </MyButton>
                    </section>
                </section>
            </Modal>
        </>
    )
}