import { FC } from "react";
import classes from './saveDoctorVip.module.scss'
import { doctorService, IDoctorVipChange, IDoctorVipReq } from "../../../entities/doctor";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";
import { MyButton } from "../../../shared/ui/myButton";

interface IProps {
    doctorVip: IDoctorVipChange;
}

export const SaveDoctorVip: FC<IProps> = ({doctorVip}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getDoctorVipReq = () => {
        const doctorVipReq: IDoctorVipReq = {
            doctorId: doctorVip.doctorId,
            canBarter: doctorVip.canBarter,
            canBuyAdvertising: doctorVip.canBuyAdvertising,
            canSellAdvertising: doctorVip.canSellAdvertising,
            blogInfo: doctorVip.blogInfo,
            shortMessage: doctorVip.shortMessage,
            endDate: doctorVip.endDate,
            advertisingPriceFrom: doctorVip.advertisingPriceFrom,
        }
        return doctorVipReq
    }

    const onSave = async () => {
        try {
            setIsLoading(true)
            await doctorService.changeVip(getDoctorVipReq())
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при сохранении данных вип доктора', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <MyButton onClick={onSave}>
                Сохранить
            </MyButton>
            
        </section>
    )
}