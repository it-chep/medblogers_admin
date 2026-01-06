import {Link} from "react-router-dom";
import {BLOGS_ROUTE, DOCTORS_ROUTE, FREELANCERS_ROUTE} from "../../app/router/routes";
import classes from './home.module.scss'

export default function HomePage() {
    return (
        <section className="wrapper_main">
            <section className={classes.links}>
                <Link to={BLOGS_ROUTE.path}>Статьи</Link>
            </section>
            <section className={classes.links}>
                <Link to={DOCTORS_ROUTE.path}>Врачи</Link>
            </section>
            <section className={classes.links}>
                <Link to={FREELANCERS_ROUTE.path}>Помощники</Link>
            </section>
        </section>
    )
}