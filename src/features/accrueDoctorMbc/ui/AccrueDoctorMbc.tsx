import { FC, useState } from "react";
import classes from './accrueDoctorMbc.module.scss'
import { doctorService } from "../../../entities/doctor";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";
import { MyButton } from "../../../shared/ui/myButton";
import { MyInput } from "../../../shared/ui/myInput";
import { Modal } from "../../../shared/ui/modal";

interface IProps {
    doctorId: number;
    onSuccess: () => void;
}

export const AccrueDoctorMbc: FC<IProps> = ({doctorId, onSuccess}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [mbcCount, setMbcCount] = useState('')
    const [error, setError] = useState('')
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const onAccrue = async () => {
        const count = Number(mbcCount)
        if (!count || count <= 0) {
            setError('Введите корректное количество баллов')
            return
        }

        try {
            setIsLoading(true)
            await doctorService.accrueMBC(doctorId, count)
            setGlobalMessage({message: 'Баллы успешно начислены', type: 'ok'})
            setIsOpen(false)
            setMbcCount('')
            onSuccess()
        } catch (e) {
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при начислении баллов', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <MyButton onClick={() => setIsOpen(true)}>
                Начислить баллы
            </MyButton>
            <Modal open={isOpen} setOpen={setIsOpen}>
                <section className={classes.modalContent}>
                    <section className={classes.modalTitle}>
                        Начисление MBC баллов
                    </section>
                    <MyInput
                        value={mbcCount}
                        setValue={setMbcCount}
                        typeInput="number"
                        sign="Количество баллов"
                        error={error}
                        setError={setError}
                        placeholder="Введите количество"
                    />
                    <section className={classes.modalActions}>
                        <MyButton onClick={onAccrue}>
                            Начислить
                        </MyButton>
                        <MyButton onClick={() => setIsOpen(false)}>
                            Отмена
                        </MyButton>
                    </section>
                </section>
            </Modal>
        </section>
    )
}
