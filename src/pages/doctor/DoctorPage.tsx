import classes from './doctor.module.scss'
import { DoctorHeader } from '../../widgets/doctorHeader';
import { DoctorCard } from '../../widgets/doctorCard';
import { Navigate, useParams } from 'react-router-dom';
import { HOME_ROUTE } from '../../app/router/routes';
import { ChangeAdditionalCityDoctor, ChangeAdditionalSpecialityDoctor } from '../../widgets/changeAdditionalDoctor';
import { ChangeSubsDoctor } from '../../widgets/changeSubsDoctor';
import { DeleteAction } from '../../features/deleteAction';
import { DoctorDelete } from '../../widgets/doctorDelete';


export default function DoctorPage() {

    const {id} = useParams<{id: string}>()

    const doctorId = Number(id);

    if(!doctorId){
        return <Navigate to={HOME_ROUTE.path} />
    }

    return (
        <section className={classes.container + " wrapper_main"}>
            <DoctorHeader doctorId={doctorId} />
            <DoctorCard doctorId={doctorId} />
            <ChangeAdditionalSpecialityDoctor doctorId={doctorId} />
            <ChangeAdditionalCityDoctor doctorId={doctorId} />
            <ChangeSubsDoctor />
            <section className={classes.delete}>
                <DoctorDelete doctorId={doctorId} />
            </section>
        </section>
    )
}