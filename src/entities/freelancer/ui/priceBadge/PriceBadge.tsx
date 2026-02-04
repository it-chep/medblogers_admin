import { FC } from "react";
import classes from './priceBadge.module.scss'

interface IProps {
    priceCategory: number;
}

export const PriceBadge: FC<IProps> = ({priceCategory}) => {

    const price = '₽₽₽₽'

    return (
        <section className={classes.price}>
            {price.split('').map((p, ind) => 
                <span 
                    key={ind} 
                    className={((ind < (+priceCategory)) ? `${classes.highlight}` : '')}
                >
                    <svg key={ind} width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00161 8.64171H4.37446V10.3935H9.46483V11.7536H4.37446V14H1.96323V11.7536H0.644262V10.3935H1.96323V8.64171H0.644262V6.7457H1.96323V0.253921H8.00161C10.8868 0.253921 12.4943 2.19115 12.4943 4.45812C12.4943 6.72509 10.8662 8.64171 8.00161 8.64171ZM4.37446 2.37663V6.7457H7.67187C9.03205 6.7457 10.0213 5.88013 10.0213 4.56116C10.0213 3.2422 9.03205 2.37663 7.67187 2.37663H4.37446Z"/>
                    </svg>
                </span>
            )}
        </section>
    )
}