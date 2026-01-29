import { FC } from "react";
import classes from './nav.module.scss'
import { useLocation } from "react-router-dom";
import { HOME_ROUTE } from "../../../../app/router/routes";
import { NavHome } from "../home/NavHome";
import { NavMain } from "../main/navMain";


export const Nav: FC = () => {

    const {pathname} = useLocation()

    const isHome = pathname === HOME_ROUTE.path

    return (
        isHome
            ?
        <NavHome />
            :
        <NavMain />
    )
}