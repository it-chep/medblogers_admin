import {FC, useEffect, useState} from "react";
import classes from './freelancersSpecialities.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { SearchItems } from "../../../features/search";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { freelancerService, ISpecialityItemFreelancer, SpecialityItemFreelancer } from "../../../entities/freelancer";
import { AddValue } from "../../../features/addValue";

export const FreelancersSpecialities: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [specialities, setSpecialities] = useState<ISpecialityItemFreelancer[]>([])
    const [searchSpecialities, setSearchSpecialities] = useState<ISpecialityItemFreelancer[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = async () => {
        try {
            setIsLoading(true)
            const specialitiesRes = await freelancerService.getSpecialities()
            setSpecialities(specialitiesRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении списка специальностей помощников', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const addSpeciality = async (name: string) => {
        try{
            await freelancerService.addSpeciality(name)
            window.location.reload()
        }
        catch(e){
            throw e
        }
    }

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
                            <AddValue 
                                buttonText="Добавить специальность"
                                placeholder="Введите название специальности..."
                                errorMessage="Ошибка при создании специальности"
                                req={addSpeciality}
                            />
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
                                <SpecialityItemFreelancer
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