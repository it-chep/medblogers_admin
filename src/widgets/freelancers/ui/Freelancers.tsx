import {FC, useEffect, useState} from "react";
import classes from './freelancers.module.scss'
import { FreelancerItem, freelancerService, IFreelancerItem } from "../../../entities/freelancer";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { AuthError } from "../../../shared/err/AuthError";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { SearchItems } from "../../../features/search";
import { ChangeFreelancerActive } from "../../../features/changeFreelancerActive";

export const Freelancers: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [freelancers, setFreelancers] = useState<IFreelancerItem[]>([])
    const [searchFreelancers, setSearchFreelancers] = useState<IFreelancerItem[]>([])
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()

    const getData = async () => {
        try {
            setIsLoading(true)
            const freelancersRes = await freelancerService.getFreelancers()
            setFreelancers(freelancersRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении списка помощников', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const setIsActive = (freelancerId: number) => {
        return (isActive: boolean) => {
            setFreelancers(freelancers => freelancers.map(freelancer => {
                if (freelancer.id === freelancerId) {
                    freelancer.isActive = isActive;
                }
                return freelancer
            }))
        }
    }

    return (
        <section className={classes.container}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                freelancers.length > 0
                    &&
                <>
                    <section className={classes.search}>
                        <SearchItems 
                            items={freelancers}
                            setItemsSearch={setSearchFreelancers}
                        />
                    </section>
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.item}>
                                <th>ID</th>
                                <th>ФИО</th>
                                <th>Статус публикации</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={classes.list}>
                            {searchFreelancers.map((freelancer, ind) =>
                                <FreelancerItem 
                                    key={freelancer.id}
                                    freelancerItem={freelancer}
                                >
                                    <ChangeFreelancerActive 
                                        freelancerId={freelancer.id}
                                        isActive={freelancer.isActive}
                                        setIsActive={setIsActive(freelancer.id)}
                                    />
                                </FreelancerItem>
                            )}
                        </tbody>
                    </table>
                </>
            }
        </section>
    )
}