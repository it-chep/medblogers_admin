import {FC} from "react";
import classes from './cityItem.module.scss'
import {ICityItem} from "../../model/types";

interface IProps {
    cityItem: ICityItem;
}

export const CityItem: FC<IProps> = ({cityItem}) => {
    return (
        <tr
            className={classes.item}
        >
            <td>
                {cityItem.id}
            </td>
            <td>
                {cityItem.name}
            </td>
        </tr>
    )
}