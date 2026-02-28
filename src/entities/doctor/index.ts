export { SpecialityItem as SpecialityItemDoctor } from "./ui/specialityItem/SpecialityItem";
export { CityItem as CityItemDoctor } from "./ui/cityItem/CityItem";
export { SubscriberData } from "./ui/subscriberData/SubscriberLink";
export { useDoctorActions } from "./lib/hooks/useDoctorActions";
export {default as doctorReducer} from './model/reducers/DoctorSlice'
export {DoctorItem} from "./ui/doctorItem/DoctorItem";
export {doctorService} from "./api/DoctorService";

export type {
    IDoctorItem, ICityItem as ICityItemDoctor, ISpecialityItem as ISpecialityItemDoctor, IDoctorRequest, IDoctorVipReq,
    ICooperationType as ICooperationTypeDoctor, SubscribersInfo as ISubscribersInfoDoctor, IDoctorVip, IDoctorVipChange,
    IMBCHistoryItem, IMBCAccrueRequest
} from "./model/types"