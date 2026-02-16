import { FC, useEffect, useState } from "react"
import classes from './changeDoctorVip.module.scss'
import { useGlobalMessageActions } from "../../../../entities/globalMessage"
import { useUserActions } from "../../../../entities/user"
import { doctorService, IDoctorVipChange } from "../../../../entities/doctor";
import { AuthError, MyError } from "../../../../shared/err/AuthError";
import { LoaderContainer } from "../../../../shared/ui/loaderContainer";
import { ChangeForm } from "../change/ChangeForm";
import { SaveDoctorVip } from "../../../../features/saveDoctorVip";
import { ChangeDoctorVipActive } from "../../../../features/changeDoctorVipActive";

interface IProps {
    doctorId: number;
}

export const ChangeDoctorVip: FC<IProps> = ({doctorId}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [doctorVip, setDoctorVip] = useState<IDoctorVipChange>({
        doctorId,
        canBarter: false,
        canBuyAdvertising: false,
        canSellAdvertising: false,
        endDate: '',
        advertisingPriceFrom: 0,
        shortMessage: '',
        blogInfo: '',
        isActive: false,
    })
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const [isCreate, setIsCreate] = useState<boolean>(false)

    const getData = async () => {
        try {
            setIsLoading(true)
            const doctorRes = await doctorService.getVip(doctorId)
            setDoctorVip({...doctorRes, doctorId})
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                if(e instanceof MyError && e.status === 404){
                    setIsCreate(true)
                }
                else{
                    setGlobalMessage({message: 'Ошибка при получении данных вип доктора', type: 'error'})
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const setIsActive = (isActive: boolean) => {
        setDoctorVip(doctorVip => ({...doctorVip, isActive}))
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Вип карточка
            </section>
            {
                isLoading
                    ?
                <section className={classes.loader}>
                    <LoaderContainer />
                </section>
                    :
                isCreate
                    ?
                <section 
                    className={classes.create}
                    onClick={() => setIsCreate(false)}
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 16H27" stroke="#F2F2F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 5V27" stroke="#F2F2F2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </section>
                    :
                <section className={classes.formWrap}>
                    <section className={classes.form}>
                        <section className={classes.subTitle}>
                            Активация
                        </section>
                        <ChangeDoctorVipActive 
                            doctorId={doctorId}
                            setIsActive={setIsActive}
                            isActive={doctorVip.isActive}
                        />
                    </section>
                    <section className={classes.form}>
                        <section className={classes.subTitle}>
                            Данные
                        </section>
                        <ChangeForm 
                            doctorVip={doctorVip}
                            setDoctorVip={setDoctorVip}
                        />
                        <SaveDoctorVip 
                            doctorVip={doctorVip}
                        />
                    </section>
                </section>

            }
        </section>
    )
}