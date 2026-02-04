export interface IFreelancer {
    id: number
    name: string
    email: string
    slug: string

    isActive: boolean
    portfolioLink: string
    tgUrl: string

    agencyRepresentative: boolean
    dateStarted: string
    priceCategory: number

    mainCity: ICityItem
    mainSpeciality: ISpecialityItem

    image: string
    birthDate: string
    createdAt: string

    cooperationType: ICooperationType
}

export interface ICityItem {
    id: number
    name: string
}

export interface ISpecialityItem {
    id: number
    name: string
}

export interface IRecommendation {
    doctorId: number
    doctorName: string
}

export interface ICooperationType {
    id: number
    name: string
}

export interface IPriceListItem {
    id: number
    name: string
    amount: string
}

export interface ISocialNetworkItem {
    id: number
    name: string
}

export interface IFreelancerItem {
    id: number
    name: string
    isActive: boolean
    image: string
    cooperationType: ICooperationType
}

export interface IFreelancerInitialState {
    freelancer: IFreelancer;
    isLoading: boolean;
    error: string;
}