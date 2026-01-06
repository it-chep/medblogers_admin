import {fetchAuth} from "../../../../shared/api/ApiService"
import {IDoctor, IDoctorItem} from "../model/types";


class DoctorService {

    async addAdditionalCity(doctorID: bigint, cityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/add_additional_city`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "cityID": cityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addAdditionalSpeciality(doctorID: bigint, specialityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/add_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "specialityID": specialityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalCity(doctorID: bigint, cityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/delete_additional_city`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "cityID": cityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalSpeciality(doctorID: bigint, specialityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/delete_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({"doctorID": doctorID, "specialityID": specialityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async saveDoctorImage(doctorID: bigint, imageData: ArrayBuffer): Promise<string> {
        // Альтернативный метод конвертации ArrayBuffer в base64
        const uint8Array = new Uint8Array(imageData);
        let binary = '';

        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }

        const base64Image = btoa(binary);

        const payload = {
            doctorID: doctorID,
            image_data: base64Image
        };

        const res = await fetchAuth(
            process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/save_photo`,
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


    async activateDoctor(doctorID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/activate`, {
            method: "POST",
            body: JSON.stringify({doctorID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deactivateDoctor(doctorID: bigint) {
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

    async getDoctorsByIDs(doctorsIDs: bigint) {
    }

    async getDoctorByID(doctorID: bigint): Promise<IDoctor> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}`)
        return await res.json()
    }


    async updateSubscribers(doctorID: bigint, key: string, subs_count: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/doctor/${doctorID}/update_subscribers`, {
            method: "POST",
            body: JSON.stringify({
                "doctorID": doctorID,
                "updateSubscribers": {
                    "key": key,
                    "subsCount": subs_count,
                }
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    // async updateDoctor() {
    // }
    //
    // async getBlog(blogId: string): Promise<IBlog> {
    //     const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blogId}`)
    //     const blog: IBlog = await res.json()
    //     return blog
    // }
    //
    // async updateBlog(blog: IBlog, body: string) {
    //     await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/blog/${blog.blogId}/update`, {
    //         method: "POST",
    //         body: JSON.stringify({...blog, body}),
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //         }
    //     })
    // }
    //
}

export const doctorService = new DoctorService()