import { FC } from "react"
import classes from './navHome.module.scss'
import { BLOGS_ROUTE, DOCTORS_ROUTE, FREELANCERS_ROUTE } from "../../../../app/router/routes";
import { Link } from "react-router-dom";


type INav = {
    path: string;
    name: string;
}

export const NavHome: FC = () => {

    const navs: INav[] = [
        BLOGS_ROUTE,
        DOCTORS_ROUTE,
        FREELANCERS_ROUTE,
    ]   

    return (
        <nav className={classes.container}>
            {
                navs.map(nav =>
                    <Link
                        to={nav.path}
                        key={nav.path}
                        className={classes.item}
                    >
                        {nav.name}
                    </Link>
                )
            }
        </nav>
    )
}