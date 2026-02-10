import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICityItem, ICooperationType, IDoctor, IDoctorState, ISpecialityItem, SubscribersInfo } from "../types";

const DoctorInitialState: IDoctorState = {
    error: '',
    isLoading: true,
    doctor: {
        id: -1,
        name: '',
        email: '',
        slug: '',
        isActive: false,
        isKfDoctor: false,
        instUrl: '',
        vkUrl: '',
        dzenUrl: '',
        tgChannelUrl: '',
        tgUrl: '',
        tiktokUrl: '',
        youtubeUrl: '',
        siteLink: '',
        mainBlogTheme: '',
        image: '',
        birthDate: '',
        createdAt: '',
        marketingPreferences: '',
        medicalDirections: '',
        mainCity: {
            id: -1,
            name: '',
        },
        mainSpeciality: {
            id: -1,
            name: ''
        },
        cooperationType: {
            id: -1,
            name: ''
        },
        subscribersInfo: []
    }
}

export const DoctorSlice = createSlice({
    name: 'doctor',
    initialState: DoctorInitialState,
    reducers: {
        setDoctor(state, action: PayloadAction<IDoctor>){
            state.doctor = action.payload;
        },
        setCreatedAt(state, action: PayloadAction<string>){
            state.doctor.createdAt = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.doctor.name = action.payload;
        },
        setEmail(state, action: PayloadAction<string>){
            state.doctor.email = action.payload;
        },
        setSlug(state, action: PayloadAction<string>){
            state.doctor.slug = action.payload;
        },
        setIsActive(state, action: PayloadAction<boolean>){
            state.doctor.isActive = action.payload;
        },
        setIsKfDoctor(state, action: PayloadAction<boolean>){
            state.doctor.isKfDoctor = action.payload;
        },
        setInstUrl(state, action: PayloadAction<string>){
            state.doctor.instUrl = action.payload;
        },
        setVkUrl(state, action: PayloadAction<string>){
            state.doctor.vkUrl = action.payload;
        },
        setDzenUrl(state, action: PayloadAction<string>){
            state.doctor.dzenUrl = action.payload;
        },
        setTgUrl(state, action: PayloadAction<string>){
            state.doctor.tgUrl = action.payload;
        },
        setTgChannelUrl(state, action: PayloadAction<string>){
            state.doctor.tgChannelUrl = action.payload;
        },
        setYoutubeUrl(state, action: PayloadAction<string>){
            state.doctor.youtubeUrl = action.payload;
        },
        setTiktokUrl(state, action: PayloadAction<string>){
            state.doctor.tiktokUrl = action.payload;
        },
        setSiteLink(state, action: PayloadAction<string>){
            state.doctor.siteLink = action.payload;
        },
        setMainBlogTheme(state, action: PayloadAction<string>){
            state.doctor.mainBlogTheme = action.payload;
        },
        setImage(state, action: PayloadAction<string>){
            state.doctor.image = action.payload;
        },
        setBirthDate(state, action: PayloadAction<string>){
            state.doctor.birthDate = action.payload;
        },
        setMedicalDirections(state, action: PayloadAction<string>){
            state.doctor.medicalDirections = action.payload;
        },
        setMarketingPreferences(state, action: PayloadAction<string>){
            state.doctor.marketingPreferences = action.payload;
        },
        setMainCity(state, action: PayloadAction<ICityItem>){
            state.doctor.mainCity = action.payload;
        },
        setMainSpeciality(state, action: PayloadAction<ISpecialityItem>){
            state.doctor.mainSpeciality = action.payload;
        },
        setCooperationType(state, action: PayloadAction<ICooperationType>){
            state.doctor.cooperationType = action.payload;
        },

        setSubscriberInfo(state, action: PayloadAction<{ind: number, subs: string}>){
            state.doctor.subscribersInfo[action.payload.ind].subsCount = action.payload.subs;
        },
    }   
})

export default DoctorSlice.reducer