import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { FreelancerSlice } from "../../model/reducers/FreelancerSlice"



export const useFreelancerActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(FreelancerSlice.actions, dispatch)
}