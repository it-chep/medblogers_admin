import {FC} from "react";
import classes from './specialityItem.module.scss'
import {ISpecialityItem} from "../../model/types";

interface IProps {
    specialityItem: ISpecialityItem;
}

export const SpecialityItem: FC<IProps> = ({specialityItem}) => {
    return (
        <tr
            className={classes.item}
        >
            <td>
                {specialityItem.id}
            </td>
            <td>
                {specialityItem.name}
            </td>
        </tr>
    )
}