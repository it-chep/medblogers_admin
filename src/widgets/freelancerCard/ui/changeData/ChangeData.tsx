import { FC } from "react";
import classes from './changeData.module.scss'
import { InputEdit } from "../../../../shared/ui/inputEdit";
import { useAppSelector } from "../../../../app/store/store";
import { SelectedItem } from "../../../../shared/ui/selectedItem";
import { 
    ICityItemFreelancer, ICooperationTypeFreelancer, 
    ISpecialityItemFreelancer, useFreelancerActions 
} from "../../../../entities/freelancer";
import { ToggleSwitch } from "../../../../shared/ui/toggleSwitch";

interface IProps {
    cities: ICityItemFreelancer[];
    specialities: ISpecialityItemFreelancer[];
    cooperations: ICooperationTypeFreelancer[];
}

export const ChangeData: FC<IProps> = ({cities, specialities, cooperations}) => {

    const {freelancer} = useAppSelector(s => s.freelancerReducer)

    const {
        setName, setEmail, setSlug, setTgUrl, setBirthDate, setMainCity, setMainSpeciality,
        setCooperationType, setPortfolioLink, setPriceCategory, setDateStarted, setAgencyRepresentative
    } = useFreelancerActions()

    return (
        <section className={classes.main}>
            <section className={classes.name}>
                <InputEdit width={350} value={freelancer.name} setValue={setName} />
            </section>
            <InputEdit sign="Слаг" value={freelancer.slug} setValue={setSlug} />
            <InputEdit sign="Email" value={freelancer.email} setValue={setEmail} />
            <span className={classes.selectedItem} style={{zIndex: 3}}>
                <SelectedItem 
                    sign="Город"
                    items={cities}
                    selectedItem={freelancer.mainCity}
                    onSelected={setMainCity}
                />
            </span>
            <span className={classes.selectedItem} style={{zIndex: 2}}>
                <SelectedItem 
                    sign="Специальность"
                    items={specialities}
                    selectedItem={freelancer.mainSpeciality}
                    onSelected={setMainSpeciality}
                />
            </span>
            <InputEdit sign="Ссылка на портфолио" value={freelancer.portfolioLink} setValue={setPortfolioLink} />
            <InputEdit sign="Ссылка на на ТГ (связаться)" value={freelancer.tgUrl} setValue={setTgUrl} />
            <InputEdit sign="Ценовая категория (1-4)" value={String(freelancer.priceCategory)} setValue={val => setPriceCategory(+val)} type="number" />
            <span className={classes.selectedItem} style={{zIndex: 1}}>
                <SelectedItem 
                    sign="Тип размещения"
                    items={cooperations}
                    selectedItem={freelancer.cooperationType}
                    onSelected={setCooperationType}
                />
            </span>
            <InputEdit sign="Дата начала работы" value={freelancer.dateStarted} setValue={setDateStarted} />
            <InputEdit sign="Дата рождения" value={freelancer.birthDate} setValue={setBirthDate} />

            <section className={classes.agencyRepresentative}>
                <ToggleSwitch label="Представитель агентства" checked={freelancer.agencyRepresentative} onSelected={setAgencyRepresentative} />
            </section>
        </section>
    )
}