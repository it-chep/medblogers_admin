import {FC, useEffect, useState} from "react";
import classes from './doctorCities.module.scss'
import { CityItemDoctor, doctorService, ICityItemDoctor } from "../../../entities/doctor";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { SearchItems } from "../../../features/search";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AddDoctorsCities } from "../../../features/addDoctorsCities";

export const DoctorsCities: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [cities, setCities] = useState<ICityItemDoctor[]>([])
    const [searchCities, setSearchCities] = useState<ICityItemDoctor[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = async () => {
        try {
            setIsLoading(true)
            const citiesRes = await doctorService.getCities()
            setCities(citiesRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении списка городов врачей', type: 'error'})
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
                cities.length > 0
                    &&
                <>
                    <section className={classes.search}>
                        <SearchItems
                            items={cities}
                            setItemsSearch={setSearchCities}
                        />
                        <section className={classes.add}>
                            <AddDoctorsCities />
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
                            {searchCities.map((city, ind) =>
                                <CityItemDoctor
                                    key={city.id}
                                    cityItem={city}
                                />
                            )}
                        </tbody>
                    </table>
                </>
            }
        </section>
    )
}