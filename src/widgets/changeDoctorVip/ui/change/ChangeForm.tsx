import { FC } from "react";
import classes from './changeForm.module.scss'
import { IDoctorVipChange } from "../../../../entities/doctor";
import { changeDoctorVip } from "../../lib/helpers/changeDoctorVip";
import { InputEdit } from "../../../../shared/ui/inputEdit";
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";
import { TextareaEdit } from "../../../../shared/ui/textareaEdit";

interface IProps {
    doctorVip: IDoctorVipChange;
    setDoctorVip: (doctorVip: IDoctorVipChange) => void;
}

export const ChangeForm: FC<IProps> = ({doctorVip, setDoctorVip}) => {

    const {
        setCanBarter, setCanBuyAdvertising, setCanSellAdvertising, setAdvertisingPriceFrom,
        setShortMessage, setBlogInfo, setEndDate
    } = changeDoctorVip(doctorVip, setDoctorVip)
    
    return (
        <section className={classes.main}>
            <ToggleSwitch 
                label="Может БАРТЕР"
                checked={doctorVip.canBarter} 
                onSelected={setCanBarter} 
            />
            <ToggleSwitch 
                label="Может КУПИТЬ рекламу"
                checked={doctorVip.canBuyAdvertising} 
                onSelected={setCanBuyAdvertising} 
            />
            <ToggleSwitch 
                label="Может ПРОДАТЬ рекламу"
                checked={doctorVip.canSellAdvertising} 
                onSelected={setCanSellAdvertising} 
            />
            <InputEdit 
                sign="Стоимость рекламы" 
                value={String(doctorVip.advertisingPriceFrom)} 
                setValue={(val: string) => setAdvertisingPriceFrom(+val)}
                type="number"    
                width={200}
            />
            <TextareaEdit sign="Послание другим (короткое сообщение)"
                value={String(doctorVip.shortMessage)} 
                setValue={setShortMessage}
                width={600}
            />
            <TextareaEdit sign="Расширенная информация о блоге"
                value={String(doctorVip.blogInfo)} 
                setValue={setBlogInfo}
                width={600}
            />
            <InputEdit 
                sign="Конец действия вип статуса" 
                value={String(doctorVip.endDate)} 
                setValue={setEndDate}
                width={200}
                type="date"
            />
        </section>
    )
}