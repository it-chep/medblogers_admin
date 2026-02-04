import { FC } from "react";
import classes from './deletePriceList.module.scss'
import { freelancerService, IPriceListItem, PriceListItem } from "../../../entities/freelancer";
import { DeleteAction } from "../../deleteAction";

interface IProps{
    freelancerId: number;
    priceList: IPriceListItem[];
    setPriceList: (priceList: IPriceListItem[]) => void;
}

export const DeletePriceList: FC<IProps> = ({freelancerId, priceList, setPriceList}) => {

    const onDelete = async (ind: number) => {
        // await freelancerService.deletePriceList(freelancerId, priceList[ind].id)
        await new Promise(resolve => setTimeout(resolve, 3332))
        const copy: IPriceListItem[] = JSON.parse(JSON.stringify(priceList))
        copy.splice(ind, 1)
        setPriceList(copy)
    }


    return (
        <section className={classes.content}>
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
                {
                    priceList.map((p, ind) => 
                        ((ind + 1) % 2 !== 0)
                            ?
                        <PriceListItem 
                            priceList={priceList}
                            key={p.id}
                            i={ind}
                            onDelete1={
                                <DeleteAction 
                                    questionText="Удалить услугу прайс-листа"
                                    successText="Успешное удалении услуги прайс-листа"
                                    errorText="Ошибка при удалении услуги прайс-листа"
                                    onDelete={() => onDelete(ind)}
                                >
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.38095 0.633928C3.38095 0.283822 3.66478 0 4.01488 0H9.08631C9.43641 0 9.72024 0.283822 9.72024 0.633928C9.72024 0.984034 9.43641 1.26786 9.08631 1.26786H4.01488C3.66478 1.26786 3.38095 0.984034 3.38095 0.633928ZM0 3.33869C0 2.98858 0.283823 2.70476 0.633929 2.70476H12.4673C12.8174 2.70476 13.1012 2.98858 13.1012 3.33869C13.1012 3.6888 12.8174 3.97262 12.4673 3.97262H12.256V12.4933C12.256 13.7722 11.2063 14.7917 9.93155 14.7917H3.16964C1.89485 14.7917 0.845238 13.7722 0.845238 12.4933V3.97262H0.633929C0.283823 3.97262 0 3.6888 0 3.33869ZM2.1131 3.97262V12.4933C2.1131 13.0535 2.57646 13.5238 3.16964 13.5238H9.93155C10.5247 13.5238 10.9881 13.0535 10.9881 12.4933V3.97262H2.1131ZM4.86012 6.03373C5.21022 6.03373 5.49405 6.31748 5.49405 6.66766V10.8288C5.49405 11.1789 5.21022 11.4627 4.86012 11.4627C4.51001 11.4627 4.22619 11.1789 4.22619 10.8288V6.66766C4.22619 6.31748 4.51001 6.03373 4.86012 6.03373ZM8.24107 6.03373C8.59117 6.03373 8.875 6.31748 8.875 6.66766V10.8288C8.875 11.1789 8.59117 11.4627 8.24107 11.4627C7.89097 11.4627 7.60714 11.1789 7.60714 10.8288V6.66766C7.60714 6.31748 7.89097 6.03373 8.24107 6.03373Z" fill="white"/>
                                    </svg>
                                </DeleteAction>
                            }
                            onDelete2={
                                <DeleteAction 
                                    questionText="Удалить услугу прайс-листа"
                                    successText="Успешное удалении услуги прайс-листа"
                                    errorText="Ошибка при удалении услуги прайс-листа"
                                    onDelete={() => onDelete(ind + 1)}
                                >
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.38095 0.633928C3.38095 0.283822 3.66478 0 4.01488 0H9.08631C9.43641 0 9.72024 0.283822 9.72024 0.633928C9.72024 0.984034 9.43641 1.26786 9.08631 1.26786H4.01488C3.66478 1.26786 3.38095 0.984034 3.38095 0.633928ZM0 3.33869C0 2.98858 0.283823 2.70476 0.633929 2.70476H12.4673C12.8174 2.70476 13.1012 2.98858 13.1012 3.33869C13.1012 3.6888 12.8174 3.97262 12.4673 3.97262H12.256V12.4933C12.256 13.7722 11.2063 14.7917 9.93155 14.7917H3.16964C1.89485 14.7917 0.845238 13.7722 0.845238 12.4933V3.97262H0.633929C0.283823 3.97262 0 3.6888 0 3.33869ZM2.1131 3.97262V12.4933C2.1131 13.0535 2.57646 13.5238 3.16964 13.5238H9.93155C10.5247 13.5238 10.9881 13.0535 10.9881 12.4933V3.97262H2.1131ZM4.86012 6.03373C5.21022 6.03373 5.49405 6.31748 5.49405 6.66766V10.8288C5.49405 11.1789 5.21022 11.4627 4.86012 11.4627C4.51001 11.4627 4.22619 11.1789 4.22619 10.8288V6.66766C4.22619 6.31748 4.51001 6.03373 4.86012 6.03373ZM8.24107 6.03373C8.59117 6.03373 8.875 6.31748 8.875 6.66766V10.8288C8.875 11.1789 8.59117 11.4627 8.24107 11.4627C7.89097 11.4627 7.60714 11.1789 7.60714 10.8288V6.66766C7.60714 6.31748 7.89097 6.03373 8.24107 6.03373Z" fill="white"/>
                                    </svg>
                                </DeleteAction>
                            }
                        />
                            :
                        <section key={p.id}></section>
                    )
                }
            </ul>
        </section>
    )
}