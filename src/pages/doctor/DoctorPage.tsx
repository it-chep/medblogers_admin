import classes from './doctor.module.scss'
import {DoctorHeader} from '../../widgets/doctorHeader';
import {DoctorCard} from '../../widgets/doctorCard';
import {Navigate, useLocation, useParams} from 'react-router-dom';
import {HOME_ROUTE} from '../../app/router/routes';
import {ChangeAdditionalCityDoctor, ChangeAdditionalSpecialityDoctor} from '../../widgets/changeAdditionalDoctor';
import {ChangeSubsDoctor} from '../../widgets/changeSubsDoctor';
import {useEffect,} from "react";


export default function DoctorPage() {

    const {id} = useParams<{ id: string }>()
    const {pathname} = useLocation();
    const doctorId = Number(id);

    useEffect(() => {
        window.scrollTo({
            top: 0, left: 0, behavior: 'smooth'
        });
    }, [pathname]);

    if (!doctorId) {
        return <Navigate to={HOME_ROUTE.path}/>
    }

    return (
        <section className={classes.container + " wrapper_main"}>
            <DoctorHeader doctorId={doctorId}/>
            <DoctorCard doctorId={doctorId}/>
            <ChangeAdditionalSpecialityDoctor doctorId={doctorId}/>
            <ChangeAdditionalCityDoctor doctorId={doctorId}/>
            <ChangeSubsDoctor/>
            {/*<section className={classes.delete}>*/}
            {/*    <DoctorDelete doctorId={doctorId}/>*/}
            {/*</section>*/}
        </section>
    )
}