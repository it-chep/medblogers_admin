import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { DoctorSlice } from "../../model/reducers/DoctorSlice"




export const useDoctorActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(DoctorSlice.actions, dispatch)
}