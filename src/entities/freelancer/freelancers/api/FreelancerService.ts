import {fetchAuth} from "../../../../shared/api/ApiService";
import { IFreelancerRequest } from "../../model/types";
import {IFreelancer, IFreelancerItem} from "../model/types";


class FreelancerService {

    async addAdditionalCity(freelancerID: bigint, cityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/add_additional_city`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "cityID": cityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addAdditionalSpeciality(freelancerID: bigint, specialityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/add_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "specialityID": specialityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalCity(freelancerID: bigint, cityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/delete_additional_city`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "cityID": cityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalSpeciality(freelancerID: bigint, specialityID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/delete_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "specialityID": specialityID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addNetwork(freelancerID: bigint, networkID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/add_network`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "networkID": networkID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteNetwork(freelancerID: bigint, networkID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/delete_network`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "networkID": networkID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async saveFreelancerImage(freelancerID: bigint, imageData: ArrayBuffer): Promise<string> {
        // Альтернативный метод конвертации ArrayBuffer в base64
        const uint8Array = new Uint8Array(imageData);
        let binary = '';

        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }

        const base64Image = btoa(binary);

        const payload = {
            doctorID: freelancerID,
            image_data: base64Image
        };

        const res = await fetchAuth(
            process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/save_photo`,
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


    async activateFreelancer(freelancerID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/activate`, {
            method: "POST",
            body: JSON.stringify({freelancerID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deactivateFreelancer(freelancerID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/deactivate`, {
            method: "POST",
            body: JSON.stringify({freelancerID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addRecommendation(freelancerID: bigint, doctorID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/add_recommendation`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "doctorID": doctorID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteRecommendation(freelancerID: bigint, doctorID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/delete_recommendation`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "doctorID": doctorID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addPriceList(freelancerID: bigint, name: string, amount: string) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/add_price_list`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "name": name, "amount": amount}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deletePriceList(freelancerID: bigint, priceListID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/delete_price_list`, {
            method: "POST",
            body: JSON.stringify({"freelancerID": freelancerID, "priceListID": priceListID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getFreelancers(): Promise<IFreelancerItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancers`)
        const {freelancers}: { freelancers: IFreelancerItem[] } = await res.json()

        return freelancers
    }

    async getFreelancerByID(freelancerID: bigint): Promise<IFreelancer> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}`)
        return await res.json()
    }

    async updateFreelancer(freelancer: IFreelancerRequest) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/api/v1/admin/freelancer/${freelancer.freelancerId}/update`, {
            method: "POST",
            body: JSON.stringify({freelancer}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteFreelancer(freelancerID: bigint) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/delete`, {
            method: "POST",
            body: JSON.stringify({freelancerID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }
}