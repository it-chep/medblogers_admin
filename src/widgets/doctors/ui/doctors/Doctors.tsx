import {FC, useEffect, useState} from "react";
import {DoctorItem, doctorService, IDoctorItem} from "../../../../entities/doctor/doctors";
import classes from './doctors.module.scss'
import {LoaderSpinner} from "../../../../shared/ui/spinner";
// import { ChangeDoctorActive } from "../../../features/changeDoctorActive";
import {useGlobalMessageActions} from "../../../../entities/globalMessage";
import {useUserActions} from "../../../../entities/user";
import {AuthError} from "../../../../shared/err/AuthError";

export const Doctors: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [doctors, setDoctors] = useState<IDoctorItem[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = async () => {
        try {
            setIsLoading(true)
            const DoctorsRes = await doctorService.getDoctors()
            setDoctors(DoctorsRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении списка врачей', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const setIsActive = (doctorID: number) => {
        return (isActive: boolean) => {
            setDoctors((doctors: any[]) => doctors.map(doctor => {
                if (doctor.doctorID === doctorID) {
                    doctor.isActive = isActive;
                }
                return doctor
            }))
        }
    }

    return (
        <section className={classes.container}>
            {
                isLoading
                    ?
                    <section className={classes.loader}><LoaderSpinner/></section>
                    :
                    doctors.length > 0
                    &&
                    <table className={classes.table}>
                        <thead>
                        <tr className={classes.item}>
                            <th>ID</th>
                            <th>ФИО</th>
                            <th>ФОТО ?</th>
                            <th>Статус публикации</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className={classes.list}>
                        {doctors.map((doctor, ind) =>
                            <DoctorItem
                                ind={ind + 1}
                                key={doctor.id}
                                doctorItem={doctor}
                            >

                            </DoctorItem>
                        )}
                        </tbody>
                    </table>
            }
        </section>
    )
}