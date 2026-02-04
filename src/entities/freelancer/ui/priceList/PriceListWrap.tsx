import { FC } from "react";
import classes from './priceList.module.scss'
import { PriceList } from "./PriceList";
import { IPriceListItem } from "../../freelancers/model/types";

interface IProps {
    priceList: IPriceListItem[];
}

export const PriceListWrap: FC<IProps> = ({priceList}) => {

    return (
        <section className={classes.content}>
            <PriceList priceList={priceList} />
        </section>
    )
}