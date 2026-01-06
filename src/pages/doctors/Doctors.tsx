import classes from './doctors.module.scss'
import {Doctors} from "../../widgets/doctors";


export default function DoctorsPage() {

    return (
        <section className={classes.container + " wrapper_main"}>
            <section className={classes.header}>
                <h1>
                    Список врачей
                </h1>
            </section>
            <Doctors/>
        </section>
    )
}