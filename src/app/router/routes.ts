import { IRoute } from "./types";




export const HOME_ROUTE: IRoute = {
    path: '/',
    name: 'Главная'
}

export const BLOGS_ROUTE: IRoute = {
    path: '/blogs',
    name: 'Статьи'
}

export const BLOG_UPDATE_ROUTE: IRoute = {
    path: '/blog/:id',
    name: 'Обновление статьи'
}

export const LOGIN_ROUTE: IRoute = {
    name: 'Вход',
    path: '/login'
}

export const REGISTRATION_ROUTE: IRoute = {
    name: 'Вход',
    path: '/registration'
}