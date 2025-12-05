import { Link } from "react-router-dom";
import { BLOGS_ROUTE } from "../../app/router/routes";
import classes from './home.module.scss'

export default function HomePage() {


    return (
        <section className="wrapper_main">
            <section className={classes.links}>
                <Link to={BLOGS_ROUTE.path}>Статьи</Link>
            </section>
        </section>
    )
}