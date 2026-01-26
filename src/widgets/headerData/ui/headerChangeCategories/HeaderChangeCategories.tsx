import { FC } from "react";
import classes from './headerChangeCategories.module.scss'
import { ChangeCategories } from "../../../../features/changeCategories";


export const HeaderChangeCategories: FC = () => {



    return (
        <section className={classes.container}>
            <ChangeCategories />
        </section>
    )
}