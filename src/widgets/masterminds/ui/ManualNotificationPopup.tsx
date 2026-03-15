import { FC } from "react";
import classes from './manualNotificationPopup.module.scss'
import { IMastermindItem } from "../../../entities/mastermind";

type ManualNotificationPopupProps = {
    item: IMastermindItem | null;
    isSending: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ManualNotificationPopup: FC<ManualNotificationPopupProps> = ({
    item,
    isSending,
    onClose,
    onConfirm
}) => {
    if (!item) {
        return null
    }

    return (
        <section className={classes.popupOverlay} onClick={onClose}>
            <section className={classes.popupCard} onClick={(e) => e.stopPropagation()}>
                <h3>Вы точно уверены?</h3>
                <p>Будет отправлена ручная рассылка для мастермайнда: {item.name}.</p>
                <section className={classes.popupActions}>
                    <button onClick={onClose} disabled={isSending}>
                        Отмена
                    </button>
                    <button onClick={onConfirm} disabled={isSending}>
                        Подтвердить
                    </button>
                </section>
            </section>
        </section>
    )
}
