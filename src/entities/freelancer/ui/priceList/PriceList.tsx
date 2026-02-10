import React, { FC } from "react";
import { IPriceListItem } from "../../model/types";
import classes from './priceList.module.scss'

interface IProps {
    priceList: IPriceListItem[];
}

export const PriceList: FC<IProps> = ({priceList}) => {

    const renderItems = () => {
        const items: React.ReactNode[] = [];
        for (let i = 0; i < priceList.length; i+=2){
            items.push(
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
                                </section>
                            </>
                        }
                    </section>
                </li>
            )
        }
        return items
    }

    return (
        <ul className={classes.list}>
            <li className={classes.top}>
                <section className={classes.section}>
                    <section className={classes.badge}>
                        Услуга
                    </section>
                    <section className={classes.badge}>
                        Стоимость           
                    </section>
                </section>
                <section className={classes.section}>
                    <section className={classes.badge}>
                        Услуга
                    </section>
                    <section className={classes.badge}>
                        Стоимость           
                    </section>
                </section>
            </li>
            {renderItems()}
        </ul>
    )
}