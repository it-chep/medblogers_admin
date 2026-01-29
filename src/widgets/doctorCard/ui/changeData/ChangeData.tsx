import { FC } from "react";
import classes from './changeData.module.scss'
import { InputEdit } from "../../../../shared/ui/inputEdit";
import { useAppSelector } from "../../../../app/store/store";
import { ICityItemDoctor, useDoctorActions, ISpecialityItemDoctor, ICooperationTypeDoctor } from "../../../../entities/doctor";
import { SelectedItem } from "../../../../shared/ui/selectedItem";

interface IProps {
    cities: ICityItemDoctor[];
    specialities: ISpecialityItemDoctor[];
    cooperations: ICooperationTypeDoctor[];
}

export const ChangeData: FC<IProps> = ({cities, specialities, cooperations}) => {

    const {doctor} = useAppSelector(s => s.doctorReducer)

    const {
        setName, setEmail, setSlug, setTgUrl, setTgChannelUrl, setYoutubeUrl, setVkUrl,
        setInstUrl, setTiktokUrl, setDzenUrl, setSiteLink, setCreatedAt, setMainBlogTheme,
        setMarketingPreferences, setMainCity, setMainSpeciality, setCooperationType
    } = useDoctorActions()

    return (
        <section className={classes.main}>
            <section className={classes.name}>
                <InputEdit width={350} value={doctor.name} setValue={setName} />
            </section>
            <InputEdit sign="Слаг" value={doctor.slug} setValue={setSlug} />
            <InputEdit sign="Email" value={doctor.email} setValue={setEmail} />
            <span className={classes.selectedItem} style={{zIndex: 3}}>
                <SelectedItem 
                    sign="Город"
                    items={cities}
                    selectedItem={doctor.mainCity}
                    onSelected={setMainCity}
                />
            </span>
            <span className={classes.selectedItem} style={{zIndex: 2}}>
                <SelectedItem 
                    sign="Специальность"
                    items={specialities}
                    selectedItem={doctor.mainSpeciality}
                    onSelected={setMainSpeciality}
                />
            </span>
            <span className={classes.selectedItem} style={{zIndex: 1}}>
                <SelectedItem 
                    sign="Тип размещения"
                    items={cooperations}
                    selectedItem={doctor.cooperationType}
                    onSelected={setCooperationType}
                />
            </span>
            <section className={classes.subTitle}>
                Ссылки на соцсети
            </section>
            <InputEdit sign="Ссылка на личный ТГ (связаться)" value={doctor.tgUrl} setValue={setTgUrl} />
            <InputEdit sign="Ссылка на ТГ канал" value={doctor.tgChannelUrl} setValue={setTgChannelUrl} />
            <InputEdit sign="Ссылка на ЮТУБ" value={doctor.email} setValue={setYoutubeUrl} />
            <InputEdit sign="Ссылка на ВК" value={doctor.vkUrl} setValue={setVkUrl} />
            <InputEdit sign="Ссылка на инстаграм" value={doctor.instUrl} setValue={setInstUrl} />
            <InputEdit sign="Ссылка на тикток" value={doctor.tiktokUrl} setValue={setTiktokUrl} />
            <InputEdit sign="Ссылка на дзен" value={doctor.dzenUrl} setValue={setDzenUrl} />
            <InputEdit sign="Ссылка на личный сайт" value={doctor.siteLink} setValue={setSiteLink} />
            <section className={classes.subTitle}>
                Дополнительная информация
            </section>
            <InputEdit sign="Дата рождения" value={doctor.createdAt} setValue={setCreatedAt} />
            <InputEdit 
                sign="У врачей каких специальностей вы бы хотели приобрести рекламу / договориться о коллаборации?" 
                value={doctor.marketingPreferences} 
                setValue={setMarketingPreferences} 
            />
            <InputEdit sign="Тематика блога" value={doctor.mainBlogTheme} setValue={setMainBlogTheme} />

        </section>
    )
}