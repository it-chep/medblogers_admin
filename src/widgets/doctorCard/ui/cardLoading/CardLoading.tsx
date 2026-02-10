import { FC } from "react";
import classes from '../card/doctorCard.module.scss'
import { LoaderContainer } from "../../../../shared/ui/loaderContainer";


export const CardLoading: FC = () => {


    return (
        <section className={classes.container + ' ' + classes.loader}>
            <section className={classes.aside}>
                <LoaderContainer />
            </section>
            <section className={classes.main}>
                <LoaderContainer />
            </section>
        </section>
    )
}