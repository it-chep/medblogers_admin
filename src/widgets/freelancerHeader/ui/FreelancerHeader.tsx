import { FC } from "react";
import classes from './freelancerHeader.module.scss'
import { ButtonBlock } from "../../../shared/ui/buttonBlock/ButtonBlock";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { FREELANCERS_ROUTE } from "../../../app/router/freelancer/freelancerRoutes";
import { UpdateFreelancer } from "../../../features/updateFreelancer";

interface IProps {
    freelancerId: number;
}

export const FreelancerHeader: FC<IProps> = ({freelancerId}) => {

    const router = useNavigate()

    const onClick = () => {
        router(FREELANCERS_ROUTE.path)
    }
    
    const {freelancer} = useAppSelector(s => s.freelancerReducer)

    return (
        <section className={classes.container}>
            <section className={classes.left}>
                <ButtonBlock onClick={onClick} />
                <span className={classes.id}>
                    Помощник: {freelancerId} (ID)
                </span>
            </section>
            <section className={classes.right}>
                <UpdateFreelancer />
            </section>
        </section>
    )
}