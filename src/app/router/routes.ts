import {IRoute} from "./types";

export const HOME_ROUTE: IRoute = {
    path: '/',
    name: 'Главная'
}


// Blogs
export const BLOGS_ROUTE: IRoute = {
    path: '/blogs',
    name: 'Статьи'
}

export const BLOG_UPDATE_ROUTE: IRoute = {
    path: '/blogs/:id',
    name: 'Обновление статьи'
}


// AUTH
export const LOGIN_ROUTE: IRoute = {
    name: 'Вход',
    path: '/login'
}

export const REGISTRATION_ROUTE: IRoute = {
    name: 'Вход',
    path: '/registration'
}

// Doctors
export const DOCTORS_ROUTE: IRoute = {
    name: 'Врачи',
    path: '/doctors'
}

export const DOCTORS_UPDATE_ROUTE: IRoute = {
    name: 'Обновление врача',
    path: '/doctors/:id'
}

// Freelancers
export const FREELANCERS_ROUTE: IRoute = {
    name: 'Помощники',
    path: '/helpers'
}

export const FREELANCERS_UPDATE_ROUTE: IRoute = {
    name: 'Обновление помощника',
    path: '/helpers/:id'
}