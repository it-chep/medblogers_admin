import { FC, useState } from "react";
import classes from './auth.module.scss'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../../app/router/routes";
import { AuthError } from "../../../shared/err/AuthError";
import { MyButton } from "../../../shared/ui/myButton";
import { MyInput } from "../../../shared/ui/myInput";
import { userService, useUserActions } from "../../../entities/user";


export const Auth: FC = () => {

    const router = useNavigate()

    const {user, isLoading, error} = useAppSelector(s => s.userReducer)
    const {setIsLoading, setError} = useUserActions()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {pathname} = useLocation()

    const isLogin = pathname === LOGIN_ROUTE.path;

    const onClick = async () => {
        try{
            setIsLoading(true)
            if(isLogin){
                await userService.login(email, password)
            }
            else{
                await userService.register(email, password)
            }
            router(HOME_ROUTE.path)
        }
        catch(e){
            if(e instanceof AuthError){
                setError(e.message)
            }
            else{
                setError('Ошибка')
                console.log(e)
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <MyInput 
                placeholder='Email' 
                value={email} 
                setValue={setEmail} 
                type="email" 
                isLoading={isLoading}
                setError={setError}
            />
            <MyInput 
                value={password} 
                setValue={setPassword}
                type={"password"}
                placeholder={'Пароль...'}
                isLoading={isLoading}
                setError={setError}
            />
            <section className={classes.button}>
                <MyButton
                    onClick={onClick}
                    isLoading={isLoading}
                    error={error}
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </MyButton>
            </section>
            <Link 
                className={classes.link}
                to={isLogin ? REGISTRATION_ROUTE.path : LOGIN_ROUTE.path}
            >
                {!isLogin ? 'Вход' : 'Регистрация'}
            </Link>
        </section>
    )
}