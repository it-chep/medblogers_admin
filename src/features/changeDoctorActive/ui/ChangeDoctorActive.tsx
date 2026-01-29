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

export const ChangeDoctorActive: FC<IProps> = ({doctorId, isActive, setIsActive}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const change = async (isActive: boolean) => {
        try{
            setIsLoading(true)
            if(isActive){
                await doctorService.activateDoctor(doctorId)
            }
            else{
                await doctorService.deactivateDoctor(doctorId)
            }
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
                setGlobalMessage({message: 'Ошибка при смене статуса публикации доктора', type: 'error'})
            }
            setIsActive(!isActive)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <ToggleSwitch 
            checked={isActive} 
            onSelected={change} 
        />
    )
}