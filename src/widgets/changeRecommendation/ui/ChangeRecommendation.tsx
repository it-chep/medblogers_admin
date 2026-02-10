import { FC, useEffect, useState } from "react";
import classes from './changeRecommendation.module.scss'
import { useUserActions } from "../../../entities/user";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { freelancerService, IRecommendation } from "../../../entities/freelancer";
import { AuthError } from "../../../shared/err/AuthError";
import { SelectedItem } from "../../../shared/ui/selectedItem";
import { MyButton } from "../../../shared/ui/myButton";
import { doctorService, IDoctorItem } from "../../../entities/doctor";
import { IItem } from "../../../shared/model/types";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { LoaderContainer } from "../../../shared/ui/loaderContainer";
import { DeleteAction } from "../../../features/deleteAction";

interface IProps {
    freelancerId: number;
}

export const ChangeRecommendation: FC<IProps> = ({freelancerId}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [recommendations, setRecommendations] = useState<IRecommendation[]>([])
    const [doctors, setDoctors] = useState<IDoctorItem[]>([])
    const {setIsAuth} = useUserActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()

    const getData = async () => {
        try {
            setIsLoading(true)
            const recommendationsRes = await freelancerService.getRecommendations(freelancerId)
            const doctorsRes = await doctorService.getDoctors()
            setRecommendations(recommendationsRes)
            setDoctors(doctorsRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении рекомендаций помощника', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    const add = async (specialityId: number) => {
        try {
            setIsLoadingGlobal(true)
            await freelancerService.addRecommendation(freelancerId, specialityId)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при добавлении рекомендации', type: 'error'})
            }
            throw e
        } finally {
            setIsLoadingGlobal(false)
        }
    }

    const onSelected = async (selected: IItem) => {
        const isInclude = recommendations.findIndex(rec => rec.doctorId === selected.id) >= 0
        if(isInclude) return
        try{
            await add(selected.id)
            const copy: IRecommendation[] = JSON.parse(JSON.stringify(recommendations))
            const targetDoctor = doctors.find(d => d.id === selected.id)
            if(targetDoctor){
                copy.push({doctorId: targetDoctor.id, doctorName: targetDoctor.name})
                setRecommendations(copy)
            } 
        }
        catch(e){}
    }

    
    const onDelete = async (ind: number) => {
        const targetRec = recommendations[ind];
        await freelancerService.deleteRecommendation(freelancerId, targetRec.doctorId)
        const copy: IRecommendation[] = JSON.parse(JSON.stringify(recommendations))
        copy.splice(ind, 1)
        setRecommendations(copy)
    }

    return (
        <section className={classes.container}>
            <section className={classes.header}>
                {
                    !isLoading
                        &&
                    <section className={classes.add}>
                        <SelectedItem 
                            sign={
                                <MyButton>
                                    Добавить рекомендацию
                                </MyButton>
                            }
                            items={doctors}
                            onSelected={onSelected}
                        />
                    </section>
                }
                <section className={classes.title}>
                    Рекомендации
                </section>
            </section>
            {
                isLoading
                    ?
                <section className={classes.loader}>
                    <LoaderContainer />
                </section>
                    :
                <ul className={classes.list}>
                    <li className={classes.top}>
                        <span className={classes.id}>
                            ID
                        </span>
                        <span className={classes.name}>
                            ФИО
                        </span>
                    </li>
                    {
                        recommendations.map((rec, ind) => 
                            <li 
                                key={rec.doctorId}
                                className={classes.item}
                            >
                                <span className={classes.id}>
                                    {rec.doctorId}
                                </span>
                                <span className={classes.name}>
                                    {rec.doctorName}
                                </span>
                                <span className={classes.delete}>
                                    <DeleteAction 
                                        questionText="Вы уверены что хотите удалить рекомендацию"
                                        successText="Успешное удаление рекомендации"
                                        errorText="Ошибка при удалении рекомендации"
                                        onDelete={() => onDelete(ind)}
                                    />
                                </span>
                            </li>
                        )
                    }
                </ul>
            }
        </section>
    )
}