import { FC, useEffect, useState } from "react";
import classes from './masterminds.module.scss'
import { IMastermindItem, mastermindService } from "../../../entities/mastermind";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { ManualNotificationPopup } from "./ManualNotificationPopup";

type MastermindsProps = {
    refreshTrigger: number;
}

export const Masterminds: FC<MastermindsProps> = ({ refreshTrigger }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [items, setItems] = useState<IMastermindItem[]>([])
    const [selectedForNotification, setSelectedForNotification] = useState<IMastermindItem | null>(null)
    const [isSendingNotification, setIsSendingNotification] = useState<boolean>(false)

    const { setGlobalMessage } = useGlobalMessageActions()
    const { setIsAuth } = useUserActions()

    const resolveError = (e: unknown, fallback: string) => {
        console.log(e)
        if (e instanceof AuthError) {
            setIsAuth(false)
            setGlobalMessage({ message: e.message, type: 'error' })
            return
        }

        if (e instanceof Error && e.message) {
            setGlobalMessage({ message: e.message, type: 'error' })
            return
        }

        setGlobalMessage({ message: fallback, type: 'error' })
    }

    const fetchMasterminds = async () => {
        try {
            setIsLoading(true)
            const list = await mastermindService.getMMList()
            setItems(list)
        } catch (e) {
            resolveError(e, 'Ошибка при получении списка мастермайндов')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMasterminds()
    }, [refreshTrigger])

    const onChangeActivity = async (item: IMastermindItem) => {
        try {
            await mastermindService.changeMMActivity(item.mmId, !item.activity)
            setItems((prev) => prev.map((current) => current.mmId === item.mmId ? { ...current, activity: !current.activity } : current))
            setGlobalMessage({ message: 'Активность мастермайнда обновлена', type: 'ok' })
        } catch (err) {
            resolveError(err, 'Ошибка при изменении активности мастермайнда')
        }
    }

    const onManualNotificationConfirm = async () => {
        if (!selectedForNotification) {
            return
        }
        try {
            setIsSendingNotification(true)
            await mastermindService.manualNotificationMM(selectedForNotification.mmId)
            setGlobalMessage({ message: 'Ручная рассылка отправлена', type: 'ok' })
            setSelectedForNotification(null)
        } catch (err) {
            resolveError(err, 'Ошибка при ручной рассылке мастермайнда')
        } finally {
            setIsSendingNotification(false)
        }
    }

    return (
        <section className={classes.container}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.head}>
                            <th>ID</th>
                            <th>Дата ММ</th>
                            <th>Название</th>
                            <th>Создан</th>
                            <th>Статус</th>
                            <th>Активность</th>
                            <th>Ссылка</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr key={item.mmId} className={classes.row}>
                                    <td>{item.mmId}</td>
                                    <td>{item.mmDatetime || '-'}</td>
                                    <td>{item.name || '-'}</td>
                                    <td>{item.createdAt || '-'}</td>
                                    <td>{item.status || '-'}</td>
                                    <td className={item.activity ? classes.active : classes.inactive}>{item.activity ? 'Вкл' : 'Выкл'}</td>
                                    <td>
                                        {
                                            item.mmLink
                                                ?
                                            <a href={item.mmLink} className={classes.link} target="_blank" rel="noreferrer">{item.mmLink}</a>
                                                :
                                            '-'
                                        }
                                    </td>
                                    <td>
                                        <section className={classes.actions}>
                                            <button onClick={() => onChangeActivity(item)}>{item.activity ? 'Выключить' : 'Включить'}</button>
                                            {String(item.status).trim() !== '2' && (
                                                <button onClick={() => setSelectedForNotification(item)}>Ручная рассылка</button>
                                            )}
                                        </section>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
            <ManualNotificationPopup
                item={selectedForNotification}
                isSending={isSendingNotification}
                onClose={() => setSelectedForNotification(null)}
                onConfirm={onManualNotificationConfirm}
            />
        </section>
    )
}
