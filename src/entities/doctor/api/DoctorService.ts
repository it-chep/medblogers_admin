import {ISpecialityItemDoctor} from "..";
import {fetchAuth} from "../../../shared/api/ApiService"
import {
    ICityItem,
    ICooperationType,
    IDoctor,
    IDoctorItem,
    IDoctorRequest,
    IDoctorVip,
    IDoctorVipReq,
    IMBCHistoryItem,
    ISpecialityItem
} from "../model/types";


class DoctorService {
    async getAdditionalCitiesDoctor(doctorId: number): Promise<ICityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/additional_cities`)
        const {additionalCities}: { additionalCities: ICityItem[] } = await res.json()
        return additionalCities
    }

    async getAdditionalSpecialitiesDoctor(doctorId: number): Promise<ISpecialityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/additional_specialities`)
        const {additionalSpecialities}: { additionalSpecialities: ISpecialityItem[] } = await res.json()
        return additionalSpecialities
    }

    async addAdditionalCity(doctorID: number, cityID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/add_additional_city`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "city_id": cityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addAdditionalSpeciality(doctorID: number, specialityID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/add_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "speciality_id": specialityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalCity(doctorID: number, cityID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/delete_additional_city`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "city_id": cityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalSpeciality(doctorID: number, specialityID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/delete_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "speciality_id": specialityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async changeActiveVip(doctorId: number, isVipActive: boolean) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/change_vip_activity`, {
            method: "POST",
            body: JSON.stringify({doctorId, isVipActive}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getVip(doctorId: number) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/vip_info`)
        const data: IDoctorVip = await res.json()
        return data
    }

    async changeVip(doctorVip: IDoctorVipReq) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorVip.doctorId}/change_vip_info`, {
            method: "POST",
            body: JSON.stringify({
                canBarter: doctorVip.canBarter,
                canBuyAdvertising: doctorVip.canBuyAdvertising,
                canSellAdvertising: doctorVip.canSellAdvertising,
                advertisingPriceFrom: doctorVip.advertisingPriceFrom,
                shortMessage: doctorVip.shortMessage,
                blogInfo: doctorVip.blogInfo,
                endDate: doctorVip.endDate,
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        const data: IDoctorVip = await res.json()
        return data
    }

    async saveDoctorImage(doctorId: number, imageData: ArrayBuffer): Promise<string> {
        // Альтернативный метод конвертации ArrayBuffer в base64
        const uint8Array = new Uint8Array(imageData);
        let binary = '';

        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }

        const base64Image = btoa(binary);

        const payload = {
            doctorID: doctorId,
            image_data: base64Image
        };

        const res = await fetchAuth(
            process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/save_photo`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }
        );

        const {image}: { image: string } = await res.json();
        return image
    }

    async activateDoctor(doctorID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/activate`, {
            method: "POST",
            body: JSON.stringify({doctorID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deactivateDoctor(doctorID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/deactivate`, {
            method: "POST",
            body: JSON.stringify({doctorID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getDoctors(): Promise<IDoctorItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctors`)
        const {doctors}: { doctors: IDoctorItem[] } = await res.json()
        return doctors
    }

    async getCooperations(): Promise<ICooperationType[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/cooperation_types`)
        const {cooperationTypes} = await res.json()
        return cooperationTypes
    }

    async getDoctorById(doctorId: number): Promise<IDoctor> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}`)
        const doctor = await res.json()
        return doctor
    }

    async updateSubscribers(doctorID: number, key: string, subsCount: string) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/update_subscribers`, {
            method: "POST",
            body: JSON.stringify({
                doctorID: doctorID,
                updateSubscribers: {
                    key,
                    subsCount
                }
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getCities(): Promise<ICityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctors/cities`)
        const {cities}: { cities: ICityItem[] } = await res.json()
        return cities
    }

    async addCity(name: string) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctors/cities/create`, {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addSpeciality(name: string) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctors/specialities/create`, {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getSpecialities(): Promise<ISpecialityItemDoctor[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctors/specialities`)
        const {specialities}: { specialities: ISpecialityItem[] } = await res.json()
        return specialities
    }

    async updateDoctor(doctor: IDoctorRequest) {
        const requestBody = {
            doctorId: doctor.doctorId,
            name: doctor.name,
            slug: doctor.slug,
            email: doctor.email,
            birthDate: doctor.birthDate,

            mainCityId: doctor.mainCityId,
            mainSpecialityId: doctor.mainSpecialityId,
            mainBlogTheme: doctor.mainBlogTheme,
            isKfDoctor: doctor.isKfDoctor,
            cooperationTypeId: doctor.cooperationTypeId,
            marketingPreferences: doctor.marketingPreferences,
            medicalDirections: doctor.medicalDirections,

            instUrl: doctor.instUrl,
            vkUrl: doctor.vkUrl,
            dzenUrl: doctor.dzenUrl,
            tgUrl: doctor.tgUrl,
            tgChannelUrl: doctor.tgChannelUrl,
            youtubeUrl: doctor.youtubeUrl,
            tiktokUrl: doctor.tiktokUrl,
            siteLink: doctor.siteLink
        };

        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctor.doctorId}/update`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async filterDoctors(specialities: number[]): Promise<IDoctorItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctors/filter`, {
            method: "POST",
            body: JSON.stringify({specialities}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        const {doctors}: { doctors: IDoctorItem[] } = await res.json()
        return doctors
    }

    async getMBCHistory(doctorId: number): Promise<IMBCHistoryItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/mbc_history`)
        const {items}: { items: IMBCHistoryItem[] } = await res.json()
        return items ?? []
    }

    async accrueMBC(doctorId: number, mbcCount: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/accure_mbc`, {
            method: "POST",
            body: JSON.stringify({"doctorId": doctorId, "mbcCount": mbcCount}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteDoctor(doctorId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorId}/delete`, {
            method: "POST",
            body: JSON.stringify({doctorId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

}

export const doctorService = new DoctorService()