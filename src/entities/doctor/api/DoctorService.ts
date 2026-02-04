import {ISpecialityItemDoctor} from "..";
import {fetchAuth} from "../../../shared/api/ApiService"
import {ICityItem, ICooperationType, IDoctor, IDoctorItem, IDoctorRequest, ISpecialityItem} from "../model/types";


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

        const imageUrl: string = await res.json();
        return imageUrl
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
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctor.id}/update`, {
            method: "POST",
            body: JSON.stringify({doctor}),
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