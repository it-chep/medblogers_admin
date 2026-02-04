import { IRoute } from "../types"


export const FREELANCERS_ROUTE: IRoute = {
    name: 'Помощники',
    path: '/helpers'
}

export const FREELANCERS_UPDATE_ROUTE: IRoute = {
    name: 'Обновление помощника',
    path: '/helpers/:id'
}

export const FREELANCERS_CITIES_ROUTE: IRoute = {
    name: 'Города помощников',
    path: '/helpers/cities'
}

export const FREELANCERS_SPECIALITIES_ROUTE: IRoute = {
    name: 'Специальности помощников',
    path: '/helpers/specialities'
}
