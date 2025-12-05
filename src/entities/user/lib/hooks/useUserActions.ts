import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { UserSlice } from "../../model/reducers/UserSlice"


export const useUserActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(UserSlice.actions, dispatch)
}