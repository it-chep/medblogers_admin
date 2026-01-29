import { FC } from "react"
import classes from './navMain.module.scss'
import { BLOGS_ROUTE, DOCTORS_ROUTE, FREELANCERS_ROUTE, HOME_ROUTE } from "../../../../app/router/routes";
import { Link, useLocation } from "react-router-dom";

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

    if(!navs.find(nav => nav.path === pathname)){
        return <></>
    }

    return (
        <nav className={classes.container}>
            {
                navs.map(nav =>
                    <Link
                        to={nav.path}
                        key={nav.path}
                        className={classes.item + (pathname === nav.path ? ` ${classes.selected}` : '')}
                    >
                        {nav.name}
                    </Link>
                )
            }
        </nav>
    )
}