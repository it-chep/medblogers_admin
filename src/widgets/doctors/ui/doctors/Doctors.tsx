import {FC, useCallback, useEffect, useState} from "react";
import {DoctorItem, doctorService, IDoctorItem} from "../../../../entities/doctor";
import classes from './doctors.module.scss'
import {LoaderSpinner} from "../../../../shared/ui/spinner";
import {useGlobalMessageActions} from "../../../../entities/globalMessage";
import {useUserActions} from "../../../../entities/user";
import {AuthError} from "../../../../shared/err/AuthError";
import { ChangeDoctorActive } from "../../../../features/changeDoctorActive";
import { SearchItems } from "../../../../features/search";
import { FilterSpecialities } from "../../../../features/filterSpecialities";

export const Doctors: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [doctors, setDoctors] = useState<IDoctorItem[]>([])
    const [searchDoctors, setSearchDoctors] = useState<IDoctorItem[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const fetchDoctors = async (specialityIds?: number[]) => {
        try {
            setIsLoading(true)
            const doctorsRes = specialityIds && specialityIds.length > 0
                ? await doctorService.filterDoctors(specialityIds)
                : await doctorService.getDoctors()
            setDoctors(doctorsRes)
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
        const urlParams = new URLSearchParams(window.location.search)
        const idsParam = urlParams.get('specialities')
        if (idsParam) {
            const ids = idsParam.split(',').map(Number)
            fetchDoctors(ids)
        } else {
            fetchDoctors()
        }
    }, [])

    const onFilterChange = useCallback((specialityIds: number[]) => {
        fetchDoctors(specialityIds)
    }, [])

    const setIsActive = (doctorId: number) => {
        return (isActive: boolean) => {
            setDoctors(doctors => doctors.map(doctor => {
                if (doctor.id === doctorId) {
                    doctor.isActive = isActive;
                }
                return doctor
            }))
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.filters}>
                <section className={classes.search}>
                    <SearchItems
                        items={doctors}
                        setItemsSearch={setSearchDoctors}
                    />
                </section>
                <FilterSpecialities onFilterChange={onFilterChange} />
            </section>
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
                            <th>Дата создания</th>
                            <th>Статус публикации</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={classes.list}>
                        {searchDoctors.map((doctor, ind) =>
                            <DoctorItem
                                ind={ind + 1}
                                key={doctor.id}
                                doctorItem={doctor}
                            >
                                <ChangeDoctorActive
                                    isActive={doctor.isActive}
                                    doctorId={doctor.id}
                                    setIsActive={setIsActive(doctor.id)}
                                />
                            </DoctorItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
