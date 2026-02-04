import { FC, useEffect, useState } from "react";
import classes from './freelancerCard.module.scss'
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/err/AuthError";
import { useUserActions } from "../../../../entities/user";
import { useAppSelector } from "../../../../app/store/store";
import { ChangeData } from "../changeData/ChangeData";
import { CardLoading } from "../cardLoading/CardLoading";
import { freelancerService, ICityItemFreelancer, ICooperationTypeFreelancer, ISpecialityItemFreelancer, useFreelancerActions } from "../../../../entities/freelancer";
import { ChangeFreelancerActive } from "../../../../features/changeFreelancerActive";
import { UpdateFreelancerImage } from "../../../../features/updateFreelancerImage";

interface IProps {
    freelancerId: number;
}

export const FreelancerCard: FC<IProps> = ({freelancerId}) => {

    const {setIsLoading, setFreelancer, setIsActive} = useFreelancerActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const {freelancer, isLoading} = useAppSelector(s => s.freelancerReducer)

    const [cities, setCities] = useState<ICityItemFreelancer[]>([])
    const [specialities, setSpecialities] = useState<ISpecialityItemFreelancer[]>([])
    const [cooperations, setCooperations] = useState<ICooperationTypeFreelancer[]>([])

    const getData = async () => {
        try {
            setIsLoading(true)
            const freelancerRes = await freelancerService.getFreelancerByID(freelancerId)
            const citiesRes = await freelancerService.getCities()
            const specialitiesRes = await freelancerService.getSpecialities()
            const cooperationsRes = await freelancerService.getCooperations()
            setCities(citiesRes)
            setSpecialities(specialitiesRes)
            setCooperations(cooperationsRes)
            setFreelancer(freelancerRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении данных о помощнике', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        isLoading
            ?
        <CardLoading />
            :
        <section className={classes.container}>
            <section className={classes.aside}>
                <UpdateFreelancerImage />
                <section className={classes.isActive}> 
                    Активность карточки
                    <ChangeFreelancerActive 
                        isActive={freelancer.isActive}
                        freelancerId={freelancerId}
                        setIsActive={setIsActive}
                    />
                </section>
            </section>
            <ChangeData 
                cities={cities} 
                specialities={specialities} 
                cooperations={cooperations}
            />
        </section>
    )
}