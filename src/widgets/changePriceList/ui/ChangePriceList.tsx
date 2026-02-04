import { FC, useEffect, useState } from "react";
import classes from './changePriceList.module.scss'
import { AuthError } from "../../../shared/err/AuthError";
import { freelancerService, IPriceListItem } from "../../../entities/freelancer";
import { useUserActions } from "../../../entities/user";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AddPriceList } from "../../../features/addPriceList";
import { LoaderContainer } from "../../../shared/ui/loaderContainer";
import { DeletePriceList } from "../../../features/deletePriceList";

interface IProps {
    freelancerId: number;
}

export const ChangePriceList: FC<IProps> = ({freelancerId}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [priceList, setPriceList] = useState<IPriceListItem[]>([])
    const {setIsAuth} = useUserActions()
    const {setGlobalMessage} = useGlobalMessageActions()

     const getData = async () => {
        try {
            setIsLoading(true)
            const priceListRes = await freelancerService.getPriceList(freelancerId)
            setPriceList(priceListRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении прайс-листа помощника', type: 'error'})
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
            <section className={classes.header}>
                <section className={classes.add}>
                    <AddPriceList 
                        priceList={priceList}
                        setPriceList={setPriceList}
                        freelancerId={freelancerId} 
                    />
                </section>
                <section className={classes.title}>
                    Прайс-лист
                </section>
            </section>
            {
                isLoading
                    ?
                <section className={classes.loader}>
                    <LoaderContainer />
                </section>
                    :
                <DeletePriceList  
                    freelancerId={freelancerId}
                    priceList={priceList}
                    setPriceList={setPriceList}
                />
            }
        </section>
    )
}