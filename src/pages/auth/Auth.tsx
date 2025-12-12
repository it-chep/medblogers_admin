import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { Auth } from "../../widgets/auth";
import classes from './auth.module.scss'
import { HOME_ROUTE } from "../../app/router/routes";



export default function AuthPage() {

    const {user} = useAppSelector(s => s.userReducer)

    if(user.isAuth){
        return <Navigate to={HOME_ROUTE.path} />
    }

    return (
        <section className={classes.auth}>
            <Auth />
        </section>
    )
}