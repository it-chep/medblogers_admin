import { IRoute } from "../types"




export const DOCTORS_ROUTE: IRoute = {
    name: 'Врачи',
    path: '/doctors'
}

export const DOCTORS_UPDATE_ROUTE: IRoute = {
    name: 'Обновление врача',
    path: '/doctors/:id'
}

export const DOCTORS_CITIES_ROUTE: IRoute = {
    name: 'Города врачей',
    path: '/doctors/cities'
}

export const DOCTORS_SPECIALITIES_ROUTE: IRoute = {
    name: 'Специальности врачей',
    path: '/doctors/specialities'
}
