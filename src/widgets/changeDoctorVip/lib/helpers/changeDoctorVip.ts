import { IDoctorVipChange } from "../../../../entities/doctor";





export const changeDoctorVip = (
    doctorVip: IDoctorVipChange, setDoctorVip: (doctorVip: IDoctorVipChange) => void
) => {
    return ({
        setCanBarter(canBarter: boolean){
            setDoctorVip({...doctorVip, canBarter})
        },
        setCanBuyAdvertising(canBuyAdvertising: boolean){
            setDoctorVip({...doctorVip, canBuyAdvertising})
        },
        setCanSellAdvertising(canSellAdvertising: boolean){
            setDoctorVip({...doctorVip, canSellAdvertising})
        },
        setShortMessage(shortMessage: string){
            setDoctorVip({...doctorVip, shortMessage})
        },
        setAdvertisingPriceFrom(advertisingPriceFrom: number){
            setDoctorVip({...doctorVip, advertisingPriceFrom})
        },
        setBlogInfo(blogInfo: string){
            setDoctorVip({...doctorVip, blogInfo})
        },
        setEndDate(endDate: string){
            setDoctorVip({...doctorVip, endDate})
        },
    })
}