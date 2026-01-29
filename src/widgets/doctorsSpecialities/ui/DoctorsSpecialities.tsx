import {FC, useEffect, useState} from "react";
import classes from './doctorsSpecialities.module.scss'
import { doctorService, ISpecialityItemDoctor, SpecialityItemDoctor } from "../../../entities/doctor";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { SearchItems } from "../../../features/search";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AddDoctorsSpecialities } from "../../../features/addDoctorsSpecialities";

export const DoctorsSpecialities: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [specialities, setSpecialities] = useState<ISpecialityItemDoctor[]>([])
    const [searchSpecialities, setSearchSpecialities] = useState<ISpecialityItemDoctor[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = async () => {
        try {
            setIsLoading(true)
            const specialitiesRes = await doctorService.getSpecialities()
            setSpecialities(specialitiesRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении списка специальностей врачей', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.container}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner/></section>
                    :
                specialities.length > 0
                    &&
                <>
                    <section className={classes.search}>
                        <SearchItems
                            items={specialities}
                            setItemsSearch={setSearchSpecialities}
                        />
                        <section className={classes.add}>
                            <AddDoctorsSpecialities />
                        </section>
                    </section>
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.item}>
                                <th>ID</th>
                                <th>Название</th>
                            </tr>
                        </thead>
                        <tbody className={classes.list}>
                            {searchSpecialities.map((speciality, ind) =>
                                <SpecialityItemDoctor
                                    key={speciality.id}
                                    specialityItem={speciality}
                                />
                            )}
                        </tbody>
                    </table>
                </>
            }
        </section>
    )
}