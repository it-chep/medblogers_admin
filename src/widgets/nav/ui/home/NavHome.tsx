import { FC } from "react"
import classes from './navHome.module.scss'
import { BLOGS_ROUTE } from "../../../../app/router/routes";
import { Link } from "react-router-dom";
import { DOCTORS_ROUTE } from "../../../../app/router/doctor/doctorRoutes";
import { FREELANCERS_ROUTE } from "../../../../app/router/freelancer/freelancerRoutes";

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