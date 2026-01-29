

export interface IDoctorRequest { 
    id: number;
    
}

export interface IDoctor {
    id: number
    name: string
    email: string
    slug: string

    isActive: boolean
    isKfDoctor: boolean

    instUrl: string
    vkUrl: string
    dzenUrl: string
    tgUrl: string
    tgChannelUrl: string
    youtubeUrl: string
    tiktokUrl: string
    siteLink: string

    mainBlogTheme: string
    image: string
    birthDate: string
    createdAt: string
    medicalDirections: string
    marketingPreferences: string

    mainCity: ICityItem
    mainSpeciality: ISpecialityItem

    cooperationType: ICooperationType

    subscribersInfo: SubscribersInfo[]
}

export interface ICityItem {
    id: number
    name: string
}

export interface ISpecialityItem {
    id: number
    name: string
}

export interface SubscribersInfo {
    key: "tg" | "inst" | "vk" | "youtube"
    subsCount: string
    subsCountText: string
    lastUpdatedDate: string
}

export interface ICooperationType {
    id: number
    name: string
}

export interface IDoctorItem {
    id: number
    name: string
    isActive: boolean
    image: string
    cooperationType: ICooperationType
}

export interface IDoctorState {
    doctor: IDoctor;
    isLoading: boolean;
    error: string;
}