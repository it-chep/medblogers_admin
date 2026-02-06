import {fetchAuth} from "../../../shared/api/ApiService";
import {
    ICityItem,
    ICooperationType,
    IFreelancer,
    IFreelancerItem,
    IFreelancerRequest,
    IPriceListItem,
    IRecommendation,
    ISocialNetworkItem,
    ISpecialityItem
} from "../model/types";


class FreelancerService {

    async getCities(): Promise<ICityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancers/cities`)
        const {cities}: { cities: ICityItem[] } = await res.json()
        return cities
    }

    async getSpecialities(): Promise<ISpecialityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancers/specialities`)
        const {specialities}: { specialities: ISpecialityItem[] } = await res.json()
        return specialities
    }

    async getSocialNetworks(): Promise<ISocialNetworkItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancers/social_networks`)
        const {socialNetworks}: { socialNetworks: ISocialNetworkItem[] } = await res.json()
        return socialNetworks
    }

    async getSocialNetworksFreelancer(freelancerId: number): Promise<ISocialNetworkItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/social_networks`)
        const {socialNetworks}: { socialNetworks: ISocialNetworkItem[] } = await res.json()
        return socialNetworks
    }

    async getAdditionalCitiesFreelancer(freelancerId: number): Promise<ICityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/additional_cities`)
        const {additionalCities}: { additionalCities: ICityItem[] } = await res.json()
        return additionalCities
    }

    async getAdditionalSpecialitiesFreelancer(freelancerId: number): Promise<ISpecialityItem[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/additional_specialities`)
        const {additionalSpecialities}: { additionalSpecialities: ISpecialityItem[] } = await res.json()
        return additionalSpecialities
    }

    async addCity(name: string) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancers/cities/create`, {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addSpeciality(name: string) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancers/specialities/create`, {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addAdditionalCity(freelancerId: number, cityId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/add_additional_city`, {
            method: "POST",
            body: JSON.stringify({freelancerId, cityId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addAdditionalSpeciality(freelancerId: number, specialityId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/add_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({freelancerId, specialityId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalCity(freelancerId: number, cityId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/delete_additional_city`, {
            method: "POST",
            body: JSON.stringify({freelancerId, cityId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteAdditionalSpeciality(freelancerId: number, specialityId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/delete_additional_speciality`, {
            method: "POST",
            body: JSON.stringify({freelancerId, specialityId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addNetwork(freelancerId: number, networkId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/add_network`, {
            method: "POST",
            body: JSON.stringify({freelancerId, networkId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteNetwork(freelancerId: number, networkId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/delete_network`, {
            method: "POST",
            body: JSON.stringify({freelancerId, networkId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async saveFreelancerImage(freelancerId: number, imageData: ArrayBuffer): Promise<string> {
        // Альтернативный метод конвертации ArrayBuffer в base64
        const uint8Array = new Uint8Array(imageData);
        let binary = '';

        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }

        const base64Image = btoa(binary);

        const payload = {
            freelancerId,
            image_data: base64Image
        };

        const res = await fetchAuth(
            process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/save_photo`,
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

    async activateFreelancer(freelancerID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/activate`, {
            method: "POST",
            body: JSON.stringify({freelancerID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deactivateFreelancer(freelancerID: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerID}/deactivate`, {
            method: "POST",
            body: JSON.stringify({freelancerID}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addRecommendation(freelancerId: number, doctorId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/add_recommendation`, {
            method: "POST",
            body: JSON.stringify({freelancerId, doctorId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteRecommendation(freelancerId: number, doctorId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/delete_recommendation`, {
            method: "POST",
            body: JSON.stringify({freelancerId, doctorId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async addPriceList(freelancerId: number, name: string, amount: string) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/add_price_list`, {
            method: "POST",
            body: JSON.stringify({freelancerId, name, amount}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
        const {priceListItemId}: { priceListItemId: number } = await res.json()
        return priceListItemId
    }

    async deletePriceList(freelancerId: number, priceListId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/delete_price_list`, {
            method: "POST",
            body: JSON.stringify({freelancerId, priceListId}),
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


    async getCooperations(): Promise<ICooperationType[]> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/cooperation_types`)
        const {cooperations} = await res.json()
        return cooperations
    }

    async getFreelancerByID(freelancerId: number): Promise<IFreelancer> {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}`)
        return await res.json()
    }

    async updateFreelancer(freelancer: IFreelancerRequest) { // IFreelancerReq
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancer.freelancerId}/update`, {
            method: "POST",
            body: JSON.stringify({freelancer}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async deleteFreelancer(freelancerId: number) {
        await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/delete`, {
            method: "POST",
            body: JSON.stringify({freelancerId}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
    }

    async getPriceList(freelancerId: number) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/price_list`)
        const {priceList}: { priceList: IPriceListItem[] } = await res.json()
        return priceList
    }

    async getRecommendations(freelancerId: number) {
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_API + `/v1/admin/freelancer/${freelancerId}/recommendations`)
        const {recommendations}: { recommendations: IRecommendation[] } = await res.json()
        return recommendations
    }
}

export const freelancerService = new FreelancerService()