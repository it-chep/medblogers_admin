import { FC, ReactElement } from "react";
import classes from './priceList.module.scss'
import { IPriceListItem } from "../../model/types";

interface IProps {
    priceList: IPriceListItem[];
    i: number;
    onDelete1: ReactElement;
    onDelete2: ReactElement;
}

export const PriceListItem: FC<IProps> = ({priceList, i, onDelete1, onDelete2}) => {

    return (
        <li 
            key={i}
            className={classes.item}
        >
            <section 
                className={classes.section + 
                    ((priceList.length % 2 !== 0 && i === priceList.length - 1) ? ` ${classes.last}` : '')
                }
            >
                <section className={classes.name}>
                    {priceList[i].name}
                </section>
                <section className={classes.amount}>
                    {
                        priceList[i].amount === "0" 
                            ? 
                        'по договоренности' 
                            : 
                        priceList[i].amount ? `От ${priceList[i].amount} рублей` : ''
                    }
                    {onDelete1}
                </section>
            </section>
            <section className={classes.section + 
                (((priceList.length % 2 !== 0) && (i === (priceList.length - 1))) ? ` ${classes.empty}` : '')}
            >
                {
                    (i < priceList.length - 1) 
                        &&
                    <>
                        <section className={classes.name}>
                            {priceList[i + 1].name}
                        </section>
                        <section className={classes.amount}>
                            {
                                priceList[i + 1].amount === "0" 
                                    ? 
                                'по договоренности' 
                                    : 
                                priceList[i + 1].amount ? `От ${priceList[i + 1].amount} рублей` : ''
                            }
                            {onDelete2}
                        </section>
                    </>
                }
            </section>
        </li>
    )
}