import { FC, useEffect, useState } from "react";
import classes from './doctorCard.module.scss'
import { doctorService, ICityItemDoctor, ICooperationTypeDoctor, ISpecialityItemDoctor, useDoctorActions } from "../../../../entities/doctor";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/err/AuthError";
import { useUserActions } from "../../../../entities/user";
import { useAppSelector } from "../../../../app/store/store";
import { ChangeDoctorActive } from "../../../../features/changeDoctorActive";
import { ChangeData } from "../changeData/ChangeData";
import { UpdateDoctorImage } from "../../../../features/updateDoctorImage";
import { CardLoading } from "../cardLoading/CardLoading";

interface IProps {
    doctorId: number;
}

export const DoctorCard: FC<IProps> = ({doctorId}) => {

    const {setIsLoading, setDoctor, setIsActive} = useDoctorActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const {doctor, isLoading} = useAppSelector(s => s.doctorReducer)

    const [cities, setCities] = useState<ICityItemDoctor[]>([])
    const [specialities, setSpecialities] = useState<ISpecialityItemDoctor[]>([])
    const [cooperations, setCooperations] = useState<ICooperationTypeDoctor[]>([])

    const getData = async () => {
        try {
            setIsLoading(true)
            const doctorsRes = await doctorService.getDoctorById(doctorId)
            const citiesRes = await doctorService.getCities()
            const specialitiesRes = await doctorService.getSpecialities()
            const cooperationsRes = await doctorService.getCooperations()
            setCities(citiesRes)
            setSpecialities(specialitiesRes)
            setCooperations(cooperationsRes)
            setDoctor(doctorsRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении данных о докторе', type: 'error'})
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
                <UpdateDoctorImage />
                <section className={classes.isActive}> 
                    Активность карточки
                    <ChangeDoctorActive 
                        isActive={doctor.isActive}
                        doctorId={doctorId}
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