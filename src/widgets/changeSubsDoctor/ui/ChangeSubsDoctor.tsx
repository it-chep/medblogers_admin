import { FC } from "react";
import classes from './changeSubsDoctor.module.scss'
import { useAppSelector } from "../../../app/store/store";
import tg_logo from '../../../shared/lib/assets/telegram_logo_nobackground.png'
import inst_logo from '../../../shared/lib/assets/Instagram_icon.png'
import youtube_logo from '../../../shared/lib/assets/youtube_logo.png'
import vk_logo from '../../../shared/lib/assets/vk_logo.png'
import { doctorService, ISubscribersInfoDoctor, SubscriberData, useDoctorActions } from "../../../entities/doctor";
import { InputEdit } from "../../../shared/ui/inputEdit";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { LoaderContainer } from "../../../shared/ui/loaderContainer";

export const ChangeSubsDoctor: FC = () => {

    const {doctor, isLoading: isLoadingDoctor} = useAppSelector(s => s.doctorReducer)

    const {setSubscriberInfo} = useDoctorActions()
    const {setIsAuth} = useUserActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const {setIsLoading} = useGlobalLoadingActions()

    const getIcon = (key: ISubscribersInfoDoctor['key']) => {
        switch (key){
            case "tg":
                return tg_logo
            case "inst":
                return inst_logo
            case "vk":
                return vk_logo
            case "youtube":
                return youtube_logo
        }
    }

    const onUpdate = async (subs: string, key: ISubscribersInfoDoctor['key'], ind: number) => {
        try {
            setIsLoading(true)
            await doctorService.updateSubscribers(doctor.id, key, subs)
            setSubscriberInfo({ind, subs})
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при обновлении кол-ва подписчиков', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                Информация о подписчиках
            </section>
            {
                isLoadingDoctor
                    ?
                <section className={classes.loaderContainer}>
                    <LoaderContainer />
                </section>
                    :
                <section className={classes.subs}>
                    {
                        doctor.subscribersInfo.map((sub, ind) =>
                            <SubscriberData 
                                key={sub.key}
                                socialIconSrc={getIcon(sub.key)}
                                lastUpdated={sub.lastUpdatedDate}
                            >
                                <InputEdit 
                                    value={sub.subsCount}
                                    setValue={(val) => onUpdate(val, sub.key, ind)}
                                    type="number"
                                    placeholder="Кол-во подписчиков"
                                />
                            </SubscriberData>
                        )
                    }
                </section>
            }
        </section>  
    )
}