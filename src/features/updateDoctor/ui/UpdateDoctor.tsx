import { FC } from "react";
import classes from './updateDoctor.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { useAppSelector } from "../../../app/store/store";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { doctorService, IDoctorRequest } from "../../../entities/doctor";
import { AuthError } from "../../../shared/err/AuthError";


export const UpdateDoctor: FC = () => {

    const {doctor, isLoading} = useAppSelector(s => s.doctorReducer)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getDoctorReq = () => {
        const doctorReq: IDoctorRequest = {
            doctorId: doctor.id,
            email: doctor.email,
            tgChannelUrl: doctor.tgChannelUrl,
            tgUrl: doctor.tgUrl,
            tiktokUrl: doctor.tiktokUrl,
            name: doctor.name,
            birthDate: doctor.birthDate,
            mainBlogTheme: doctor.mainBlogTheme,
            mainCityId: doctor.mainCity.id,
            mainSpecialityId: doctor.mainSpeciality.id,
            marketingPreferences: doctor.marketingPreferences,
            medicalDirections: doctor.medicalDirections,
            isKfDoctor: doctor.isKfDoctor,
            instUrl: doctor.instUrl,
            cooperationTypeId: doctor.cooperationType.id,
            vkUrl: doctor.vkUrl,
            dzenUrl: doctor.dzenUrl,
            youtubeUrl: doctor.youtubeUrl,
            siteLink: doctor.siteLink,
            slug: doctor.slug,
        }
        return doctorReq
    }

    const onSave = async () => {
        try {
            setIsLoading(true)
            await doctorService.updateDoctor(getDoctorReq())
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