import {FC, PropsWithChildren} from "react";
import classes from './freelancerItem.module.scss'
import {MyButton} from "../../../../shared/ui/myButton";
import {Link} from "react-router-dom";
import { IFreelancerItem } from "../../model/types";


interface IProps {
    freelancerItem: IFreelancerItem;
}


export const FreelancerItem: FC<IProps & PropsWithChildren> = ({freelancerItem, children}) => {
    return (
        <tr
            className={classes.item}
        >
            <td>
                {freelancerItem.id}
            </td>
            <td>
                {freelancerItem.name}
            </td>
            <td className={classes.feature}>
                {children}
            </td>
            <td className={classes.link}>
                <Link to={'/helpers/' + freelancerItem.id}>
                    <MyButton>
                        Подробнее
                    </MyButton>
                </Link>
            </td>
        </tr>
    )
}