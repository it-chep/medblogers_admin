import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICityItem, ICooperationType, IFreelancer, IFreelancerInitialState, ISpecialityItem } from "../types";



const freelancerInitialState: IFreelancerInitialState = {
    freelancer: {
        id: -1,
        name: '',
        email: '',
        slug: '',
        image: '',
        isActive: false,
        tgUrl: '',
        portfolioLink: '',
        agencyRepresentative: false,
        priceCategory: 1,
        cooperationType: {
            id: -1,
            name: ''
        },
        mainCity: {
            id: -1,
            name: ''
        },
        mainSpeciality: {
            id: -1,
            name: ''
        },
        birthDate: '',
        createdAt: '',
        dateStarted: ''
    },
    isLoading: true,
    error: ''
}

export const FreelancerSlice = createSlice({
    name: 'freelancer',
    initialState: freelancerInitialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setFreelancer(state, action: PayloadAction<IFreelancer>){
            state.freelancer = action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.freelancer.name = action.payload;
        },
        setEmail(state, action: PayloadAction<string>){
            state.freelancer.email = action.payload;
        },
        setSlug(state, action: PayloadAction<string>){
            state.freelancer.slug = action.payload;
        },
        setPortfolioLink(state, action: PayloadAction<string>){
            state.freelancer.portfolioLink = action.payload;
        },
        setTgUrl(state, action: PayloadAction<string>){
            state.freelancer.tgUrl = action.payload;
        },
        setIsActive(state, action: PayloadAction<boolean>){
            state.freelancer.isActive = action.payload;
        },
        setAgencyRepresentative(state, action: PayloadAction<boolean>){
            state.freelancer.agencyRepresentative = action.payload;
        },
        setDateStarted(state, action: PayloadAction<string>){
            state.freelancer.dateStarted = action.payload;
        },
        setPriceCategory(state, action: PayloadAction<number>){
            state.freelancer.priceCategory = action.payload;
        },
        setMainCity(state, action: PayloadAction<ICityItem>){
            state.freelancer.mainCity = action.payload;
        },
        setMainSpeciality(state, action: PayloadAction<ISpecialityItem>){
            state.freelancer.mainSpeciality = action.payload;
        },
        setImage(state, action: PayloadAction<string>){
            state.freelancer.image = action.payload;
        },
        setBirthDate(state, action: PayloadAction<string>){
            state.freelancer.birthDate = action.payload;
        },
        setCreatedAt(state, action: PayloadAction<string>){
            state.freelancer.createdAt = action.payload;
        },
        setCooperationType(state, action: PayloadAction<ICooperationType>){
            state.freelancer.cooperationType = action.payload;
        },
    }
})

export default FreelancerSlice.reducer