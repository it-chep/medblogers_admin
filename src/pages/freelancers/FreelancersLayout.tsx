import classes from './freelancersLayout.module.scss'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IRoute } from '../../app/router/types';
import { FREELANCERS_CITIES_ROUTE, FREELANCERS_ROUTE, FREELANCERS_SPECIALITIES_ROUTE } from '../../app/router/freelancer/freelancerRoutes';


export default function FreelancersLayoutPage() {

    const navs: IRoute[] = [FREELANCERS_ROUTE, FREELANCERS_CITIES_ROUTE, FREELANCERS_SPECIALITIES_ROUTE]

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