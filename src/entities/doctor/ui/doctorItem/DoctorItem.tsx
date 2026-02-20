import {FC, PropsWithChildren} from "react";
import classes from './doctorItem.module.scss'
import {IDoctorItem} from "../../model/types";
import {MyButton} from "../../../../shared/ui/myButton";
import {Link} from "react-router-dom";


interface IProps {
    doctorItem: IDoctorItem;
    ind: number;
}


export const DoctorItem: FC<IProps & PropsWithChildren> = ({doctorItem, ind, children}) => {
    return (
        <tr
            className={classes.item}
        >
            <td>
                {doctorItem.id}
            </td>
            <td>
                <Link to={'/doctors/' + doctorItem.id}>
                    {doctorItem.name}
                </Link>
            </td>
            <td>
                {doctorItem.createdAt}
            </td>
            <td className={classes.feature}>
                {children}
            </td>
            <td className={classes.link}>
                <Link to={'/doctors/' + doctorItem.id}>
                    <MyButton>
                        Подробнее
                    </MyButton>
                </Link>
            </td>
        </tr>
    )
}