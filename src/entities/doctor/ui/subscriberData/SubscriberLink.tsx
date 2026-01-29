import {FC, PropsWithChildren, ReactElement} from "react";
import classes from './subscriberData.module.scss'
import { Content } from "./Content";

interface IProps {
    socialIconSrc: string;
    lastUpdated: string;
}

export const SubscriberData: FC<IProps & PropsWithChildren> = ({
    socialIconSrc, lastUpdated, children}
) => {

    return (
        <section className={classes.subscriberLinkWrapper}>
            <section
                className={classes.subscriberLink} 
            >
                <Content 
                    socialIconSrc={socialIconSrc}
                >
                    {children}
                </Content>
            </section>
            <section className={classes.lastUpdated}>
                Дата последнего обновления: {lastUpdated}
            </section>
        </section>
    )
}