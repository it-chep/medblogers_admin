import classes from './freelancer.module.scss'
import {Navigate, useLocation, useParams} from 'react-router-dom';
import {HOME_ROUTE} from '../../app/router/routes';
import {FreelancerHeader} from '../../widgets/freelancerHeader';
import {FreelancerCard} from '../../widgets/freelancerCard';
import {ChangeAdditionalFreelancer} from '../../widgets/changeAdditionalFreelancer';
import {ChangePriceList} from '../../widgets/changePriceList';
import {ChangeRecommendation} from '../../widgets/changeRecommendation';
import {useEffect,} from "react";

export default function FreelancerPage() {

    const {id} = useParams<{ id: string }>()
    const {pathname} = useLocation();
    const freelancerId = Number(id);

    useEffect(() => {
        window.scrollTo({
            top: 0, left: 0, behavior: 'smooth'
        });
    }, [pathname]);

    if (!freelancerId) {
        return <Navigate to={HOME_ROUTE.path}/>
    }

    return (
        <section className={classes.container + " wrapper_main"}>
            <FreelancerHeader freelancerId={freelancerId}/>
            <FreelancerCard freelancerId={freelancerId}/>
            <ChangeAdditionalFreelancer freelancerId={freelancerId}/>
            <ChangePriceList freelancerId={freelancerId}/>
            <ChangeRecommendation freelancerId={freelancerId}/>
            {/*<section className={classes.delete}>*/}
            {/*    <FreelancerDelete freelancerId={freelancerId} />*/}
            {/*</section>*/}
        </section>
    )
}