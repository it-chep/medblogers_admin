import { FC, useCallback, useEffect, useState } from "react"
import classes from './doctorMbcHistory.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage"
import { useUserActions } from "../../../entities/user"
import { doctorService, IMBCHistoryItem } from "../../../entities/doctor"
import { AuthError } from "../../../shared/err/AuthError"
import { LoaderContainer } from "../../../shared/ui/loaderContainer"
import { AccrueDoctorMbc } from "../../../features/accrueDoctorMbc"

interface IProps {
    doctorId: number;
}

export const DoctorMbcHistory: FC<IProps> = ({doctorId}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [history, setHistory] = useState<IMBCHistoryItem[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = useCallback(async () => {
        try {
            setIsLoading(true)
            const items = await doctorService.getMBCHistory(doctorId)
            setHistory(items)
        } catch (e) {
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении истории начислений', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }, [doctorId])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <section className={classes.container}>
            <section className={classes.title}>
                История начислений MBC
            </section>
            {
                isLoading
                    ?
                <section className={classes.loader}>
                    <LoaderContainer />
                </section>
                    :
                <section className={classes.content}>
                    <AccrueDoctorMbc
                        doctorId={doctorId}
                        onSuccess={getData}
                    />
                    {
                        history.length > 0
                            ?
                        <section className={classes.table}>
                            <section className={classes.tableHeader}>
                                <section className={classes.cellCount}>Баллы</section>
                                <section className={classes.cellDate}>Дата</section>
                            </section>
                            {history.map((item, index) => (
                                <section key={index} className={classes.tableRow}>
                                    <section className={classes.cellCount}>{item.mbcCount}</section>
                                    <section className={classes.cellDate}>{item.occurredAt}</section>
                                </section>
                            ))}
                        </section>
                            :
                        <section className={classes.empty}>
                            Начислений пока нет
                        </section>
                    }
                </section>
            }
        </section>
    )
}
