import { FC, useState } from "react";
import classes from './addValue.module.scss'
import { MyButton } from "../../../shared/ui/myButton";
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/myInput";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useUserActions } from "../../../entities/user";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/err/AuthError";

interface IProps {
    req: (value: string) => Promise<void>;
    errorMessage: string;
    placeholder: string;
    buttonText: string;
}

export const AddValue: FC<IProps> = ({req, errorMessage, buttonText, placeholder}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const {setIsLoading} = useGlobalLoadingActions()

    const checkEmpty = (): boolean => {
        if(!value) {
            setError('Пустое поле')
            return true
        }
        return false
    }

    const addReq = async () => {
        try {
            setIsLoading(true)
            await req(value)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: errorMessage, type: 'error'})
            }
        } finally {
            setIsLoading(false)
            setOpen(false)
            setValue('')
        }
    }

    const add = () => {
        const isEmpty = checkEmpty()
        if(!isEmpty){
            addReq()
        }
    }

    return (
        <>
            <MyButton onClick={() => setOpen(true)}>
                {buttonText}
            </MyButton>
            <Modal open={open} setOpen={setOpen}>
                <section className={classes.content}>
                    <MyInput 
                        setError={setError}
                        error={error} 
                        value={value} 
                        setValue={setValue} 
                        placeholder={placeholder}
                    />
                    <section className={classes.add}>
                        <MyButton onClick={add}>
                            Создать
                        </MyButton>
                    </section>
                </section>
            </Modal>
        </>
    )
}