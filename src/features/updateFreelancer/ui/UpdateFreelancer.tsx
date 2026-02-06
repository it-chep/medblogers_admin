import { FC } from "react";
import classes from './updateDoctor.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { useAppSelector } from "../../../app/store/store";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { freelancerService, IFreelancerRequest } from "../../../entities/freelancer";


export const UpdateFreelancer: FC = () => {

    const {freelancer, isLoading} = useAppSelector(s => s.freelancerReducer)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getFreelancerRequest = () => {
        const freelancerReq: IFreelancerRequest = {
            freelancerId: freelancer.id,
            dateStarted: freelancer.dateStarted,
            agencyRepresentative: freelancer.agencyRepresentative,
            tgUrl: freelancer.tgUrl,
            slug: freelancer.slug,
            mainCityId: freelancer.mainCity.id,
            mainSpecialityId: freelancer.mainSpeciality.id,
            portfolioLink: freelancer.portfolioLink,
            priceCategory: freelancer.priceCategory,
            cooperationTypeId: freelancer.cooperationType.id,
            name: freelancer.name,
        }
        return freelancerReq
    }

    const onSave = async () => {
        try {
            setIsLoading(true)
            await freelancerService.updateFreelancer(getFreelancerRequest())
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при обновлении помощника', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton onClick={onSave} disabled={isLoading}>
                Сохранить
            </MyButton>
        </section>
    )
}