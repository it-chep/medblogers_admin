import classes from './freelancer.module.scss'
import { Navigate, useParams } from 'react-router-dom';
import { HOME_ROUTE } from '../../app/router/routes';
import { FreelancerHeader } from '../../widgets/freelancerHeader';
import { FreelancerCard } from '../../widgets/freelancerCard';
import { ChangeAdditionalFreelancer } from '../../widgets/changeAdditionalFreelancer';
import { ChangePriceList } from '../../widgets/changePriceList';
import { FreelancerDelete } from '../../widgets/freelancerDelete';
import { ChangeRecommendation } from '../../widgets/changeRecommendation';


export default function FreelancerPage() {

    const {id} = useParams<{id: string}>()

    const freelancerId = Number(id);

    if(!freelancerId){
        return <Navigate to={HOME_ROUTE.path} />
    }

    return (
        <section className={classes.container + " wrapper_main"}>
            <FreelancerHeader freelancerId={freelancerId} />
            <FreelancerCard freelancerId={freelancerId} />
            <ChangeAdditionalFreelancer freelancerId={freelancerId} />
            <ChangePriceList freelancerId={freelancerId} />
            <ChangeRecommendation freelancerId={freelancerId} />
            <section className={classes.delete}>
                <FreelancerDelete freelancerId={freelancerId} />
            </section>
        </section>
    )
}