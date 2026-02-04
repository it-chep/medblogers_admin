import { FC } from "react";
import { ToggleSwitch } from "../../../shared/ui/toggleSwitch";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useUserActions } from "../../../entities/user";
import { freelancerService } from "../../../entities/freelancer";

interface IProps {
    freelancerId: number;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
}

export const ChangeFreelancerActive: FC<IProps> = ({freelancerId, isActive, setIsActive}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const change = async (isActive: boolean) => {
        try{
            setIsLoading(true)
            if(isActive){
                await freelancerService.activateFreelancer(freelancerId)
            }
            else{
                await freelancerService.deactivateFreelancer(freelancerId)
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
                setGlobalMessage({message: 'Ошибка при смене статуса публикации помощника', type: 'error'})
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