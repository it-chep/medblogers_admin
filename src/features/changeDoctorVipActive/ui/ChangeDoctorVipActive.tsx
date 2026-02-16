import { FC } from "react";
import { ToggleSwitch } from "../../../shared/ui/toggleSwitch";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";
import { doctorService } from "../../../entities/doctor";

interface IProps {
    doctorId: number;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

export const ChangeDoctorVipActive: FC<IProps> = ({doctorId, isActive, setIsActive}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const change = async (isActive: boolean) => {
        try{
            setIsLoading(true)
            await doctorService.changeActiveVip(doctorId, isActive)
            setIsActive(isActive)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else if(e instanceof Error){
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при смене статуса вип карточки', type: 'error'})
            }
            setIsActive(!isActive)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <ToggleSwitch 
            label="Активная карточка"
            checked={isActive} 
            onSelected={change} 
        />
    )
}