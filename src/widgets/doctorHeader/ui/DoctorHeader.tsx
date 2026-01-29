import { FC } from "react";
import classes from './doctorHeader.module.scss'
import { ButtonBlock } from "../../../shared/ui/buttonBlock/ButtonBlock";
import { useNavigate } from "react-router-dom";
import { DOCTORS_ROUTE } from "../../../app/router/routes";
import { useAppSelector } from "../../../app/store/store";
import { UpdateDoctor } from "../../../features/updateDoctor";

interface IProps {
    doctorId: number;
}

export const DoctorHeader: FC<IProps> = ({doctorId}) => {

    const router = useNavigate()

    const onClick = () => {
        router(DOCTORS_ROUTE.path)
    }
    
    const {doctor} = useAppSelector(s => s.doctorReducer)

    return (
        <section className={classes.container}>
            <section className={classes.left}>
                <ButtonBlock onClick={onClick} />
                <span className={classes.id}>
                    Врач: {doctorId} (ID)
                </span>
            </section>
            <section className={classes.right}>
                <span className={classes.createdAt}>
                    Дата создания: {doctor.createdAt}
                </span>
                <UpdateDoctor />
            </section>
        </section>
    )
}