import { FC, useEffect, useState } from "react";
import classes from './addPriceList.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/myInput";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/err/AuthError";
import { freelancerService, IPriceListItem } from "../../../entities/freelancer";

interface IProps {
    freelancerId: number;
    priceList: IPriceListItem[];
    setPriceList: (priceList: IPriceListItem[]) => void;
}

export const AddPriceList: FC<IProps> = ({freelancerId, priceList, setPriceList}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [service, setService] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [error, setError] = useState<string>('')
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const {setIsLoading} = useGlobalLoadingActions()

    const checkEmpty = (): boolean => {
        if(!service || !amount) {
            setError('Одно из полей пустое')
            return true
        }
        return false
    }
    
    const addReq = async () => {
        try {
            setIsLoading(true)
            const priceListItemId = await freelancerService.addPriceList(freelancerId, service, amount)
            return priceListItemId
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при добавлении услуги в прайс-лист', type: 'error'})
            }
        } finally {
            setIsLoading(false)
        }
    }

    const addPriceList = (priceListItemId: number) => {
        const copy: IPriceListItem[] = JSON.parse(JSON.stringify(priceList))
        copy.push({id: priceListItemId, name: service, amount})
        setPriceList(copy)
    }

    const add = async () => {
        const isEmpty = checkEmpty()
        if(!isEmpty){
            try{
                const priceListItemId = await addReq()
                if(priceListItemId){
                    addPriceList(priceListItemId)
                }
            }
            catch(e){}
            finally{
                setService('')
                setAmount('')
                setOpen(false)
            }
        }
    }

    return (
        <section>
            <MyButton onClick={() => setOpen(true)}>
                Добавить
            </MyButton>
            <Modal open={open} setOpen={setOpen}>
                <section className={classes.content}> 
                    <MyInput value={service} setValue={setService} setError={setError} placeholder="Услуга" /> 
                    <MyInput value={amount} setValue={setAmount} setError={setError} placeholder="Стоимость" /> 
                    <section className={classes.sign}>
                        Поставьте 0 в стоимость, чтобы было "по договоренности"
                    </section>
                    <section className={classes.add}>
                        <MyButton error={error} onClick={add}>
                            Добавить
                        </MyButton>
                    </section>
                </section>
            </Modal>
        </section>
    )
}