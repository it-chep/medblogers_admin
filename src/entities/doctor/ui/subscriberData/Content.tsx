import { FC, PropsWithChildren, ReactElement } from "react";
import classes from './subscriberData.module.scss'

interface IProps {
    socialIconSrc: string;
}

export const Content: FC<IProps & PropsWithChildren> = ({socialIconSrc, children}) => {

    return (
        <>
            <img src={socialIconSrc} alt="Соцсеть" height={30} width={30} />
            <section className={classes.subsText}>
                {children}
            </section>
        </>
    )
}