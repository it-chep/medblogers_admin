import { FC } from "react"
import classes from './navMain.module.scss'
import { BLOGS_ROUTE, HOME_ROUTE } from "../../../../app/router/routes";
import { Link, useLocation } from "react-router-dom";
import { DOCTORS_ROUTE } from "../../../../app/router/doctor/doctorRoutes";
import { FREELANCERS_ROUTE } from "../../../../app/router/freelancer/freelancerRoutes";

type INav = {
    path: string;
    name: string;
}

export const NavMain: FC = () => {

    const {pathname} = useLocation()

    const navs: INav[] = [
        HOME_ROUTE,
        BLOGS_ROUTE,
        DOCTORS_ROUTE,
        FREELANCERS_ROUTE,
    ]   

    if(!navs.find(nav => pathname.includes(nav.path))){
        return <></>
    }

    return (
        <nav className={classes.container}>
            {
                navs.map(nav =>
                    <Link
                        to={nav.path}
                        key={nav.path}
                        className={classes.item + ((nav.path === '/') ? '' : (pathname.includes(nav.path)) ? ` ${classes.selected}` : '')}
                    >
                        {nav.name}
                    </Link>
                )
            }
        </nav>
    )
}