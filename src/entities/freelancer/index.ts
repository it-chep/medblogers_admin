export { PriceListItem } from "./ui/priceList/PriceListItem";
export { PriceListWrap } from "./ui/priceList/PriceListWrap";
export { useFreelancerActions } from "./lib/hooks/useFreelancerActions";
export { CityItem as CityItemFreelancer } from "./ui/cityItem/CityItem";
export { SpecialityItem as SpecialityItemFreelancer } from "./ui/specialityItem/SpecialityItem";
export { FreelancerItem } from "./ui/freelancerItem/FreelancerItem";
export { freelancerService } from "./api/FreelancerService";
export {default as freelancerReducer} from './model/reducers/FreelancerSlice'

export type {IFreelancerItem, IFreelancer, ICityItem as ICityItemFreelancer, ISocialNetworkItem, IPriceListItem,
    ISpecialityItem as ISpecialityItemFreelancer, ICooperationType as ICooperationTypeFreelancer, IRecommendation} from './model/types'