import { FC } from "react";
import classes from './updateDoctor.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { useAppSelector } from "../../../app/store/store";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { doctorService } from "../../../entities/doctor";
import { AuthError } from "../../../shared/err/AuthError";


export const UpdateDoctor: FC = () => {

    const {doctor, isLoading} = useAppSelector(s => s.doctorReducer)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const onSave = async () => {
        try {
            setIsLoading(true)
            await doctorService.updateDoctor(doctor)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при обновлении доктора', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton onClick={onSave} disabled={isLoading}>
                Сохранить
            </MyButton>
        </section>
    )
}