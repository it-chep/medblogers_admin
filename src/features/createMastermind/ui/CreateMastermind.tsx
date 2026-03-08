import { FC, FormEvent, useState } from "react";
import classes from './createMastermind.module.scss'
import { mastermindService } from "../../../entities/mastermind";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";

type CreateMastermindProps = {
    onCreated: () => void;
}

export const CreateMastermind: FC<CreateMastermindProps> = ({ onCreated }) => {
    const [isSubmittingCreate, setIsSubmittingCreate] = useState<boolean>(false)
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false)
    const [mmDatetime, setMmDatetime] = useState<string>('')
    const [mmName, setMmName] = useState<string>('')
    const [mmLink, setMmLink] = useState<string>('')

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

    const onCreateMM = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!mmDatetime || !mmName.trim() || !mmLink.trim()) {
            setGlobalMessage({ message: 'Заполните дату, название и ссылку мастермайнда', type: 'error' })
            return
        }

        try {
            setIsSubmittingCreate(true)
            const formattedMMDatetime = mmDatetime.includes('T')
                ? `${mmDatetime.replace('T', ' ')}:00`
                : mmDatetime
            await mastermindService.createMM({
                mmDatetime: formattedMMDatetime,
                name: mmName.trim(),
                mmLink: mmLink.trim(),
            })
            setMmName('')
            setMmLink('')
            setMmDatetime('')
            setIsCreatePopupOpen(false)
            onCreated()
            setGlobalMessage({ message: 'Мастермайнд создан', type: 'ok' })
        } catch (err) {
            resolveError(err, 'Ошибка при создании мастермайнда')
        } finally {
            setIsSubmittingCreate(false)
        }
    }

    return (
        <section className={classes.container}>
            <button className={classes.createButton} onClick={() => setIsCreatePopupOpen(true)}>
                Создать мастермайнд
            </button>

            {
                isCreatePopupOpen
                    ?
                <section className={classes.popupOverlay} onClick={() => setIsCreatePopupOpen(false)}>
                    <section className={classes.popupCard} onClick={(e) => e.stopPropagation()}>
                        <section className={classes.popupHeader}>
                            <h2>Создать мастермайнд</h2>
                            <button onClick={() => setIsCreatePopupOpen(false)}>Закрыть</button>
                        </section>
                        <form className={classes.form} onSubmit={onCreateMM}>
                            <input
                                type="datetime-local"
                                value={mmDatetime}
                                onChange={(e) => setMmDatetime(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Название"
                                value={mmName}
                                onChange={(e) => setMmName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Ссылка"
                                value={mmLink}
                                onChange={(e) => setMmLink(e.target.value)}
                            />
                            <button type="submit" disabled={isSubmittingCreate}>Создать</button>
                        </form>
                    </section>
                </section>
                    :
                null
            }
        </section>
    )
}
