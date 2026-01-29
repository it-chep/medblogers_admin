import classes from './doctors.module.scss'
import {Doctors} from "../../widgets/doctors";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { DOCTORS_CITIES_ROUTE, DOCTORS_ROUTE, DOCTORS_SPECIALITIES_ROUTE } from '../../app/router/doctor/doctorRoutes';
import { IRoute } from '../../app/router/types';


export default function DoctorsLayoutPage() {

    const navs: IRoute[] = [DOCTORS_ROUTE, DOCTORS_CITIES_ROUTE, DOCTORS_SPECIALITIES_ROUTE]

    const {pathname} = useLocation()

    return (
        <section className={classes.container + " wrapper_main"}>
            <section className={classes.header}>
                {
                    navs.map(nav => 
                        <Link 
                            className={classes.link + (nav.path === pathname ? ` ${classes.selected}` : '')}
                            key={nav.path}
                            to={nav.path}
                        >
                            {nav.name}
                        </Link>
                    )
                }
            </section>
            <Outlet />
        </section>
    )
}