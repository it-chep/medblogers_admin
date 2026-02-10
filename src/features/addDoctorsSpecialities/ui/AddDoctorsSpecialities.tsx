import { FC, useState } from "react";
import classes from './addDoctorsSpecialities.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/myInput";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { doctorService } from "../../../entities/doctor";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/err/AuthError";

export const AddDoctorsSpecialities: FC = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [speciality, setSpeciality] = useState<string>('')
    const [error, setError] = useState<string>('')
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const {setIsLoading} = useGlobalLoadingActions()

    const checkEmpty = (): boolean => {
        if(!speciality) {
            setError('Пустое поле')
            return true
        }
        return false
    }

    const addReq = async () => {
        try {
            setIsLoading(true)
            await doctorService.addSpeciality(speciality)
            window.location.reload()
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при создании специальности', type: 'error'})
            }
        } finally {
            setIsLoading(false)
            setOpen(false)
            setSpeciality('')
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
                Добавить специальность
            </MyButton>
            <Modal open={open} setOpen={setOpen}>
                <section className={classes.content}>
                    <MyInput 
                        setError={setError}
                        error={error} 
                        value={speciality} 
                        setValue={setSpeciality} 
                        placeholder="Название специальности" 
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