import {RouteObject} from "react-router-dom";
import App from "../../App";
import {
    BLOG_UPDATE_ROUTE,
    BLOGS_ROUTE,
    DOCTORS_ROUTE,
    DOCTORS_UPDATE_ROUTE,
    FREELANCERS_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE
} from "./routes";
import HomePage from "../../pages/home/Home";
import BlogsPage from "../../pages/blogs/Blogs";
import BlogEditPage from "../../pages/blogEdit/BlogEdit"
import AuthPage from "../../pages/auth/Auth";
import DoctorsPage from "../../pages/doctors/Doctors";
import DoctorPage from "../../pages/doctor/DoctorPage";
// import FreelancersPage from "../../pages/freelancers/Freelancers";

export const router: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            {
                path: HOME_ROUTE.path,
                Component: HomePage
            },
            {
                path: DOCTORS_ROUTE.path,
                Component: DoctorsPage
            },
            {
                path: DOCTORS_UPDATE_ROUTE.path,
                Component: DoctorPage
            },
            // {
            //     path: FREELANCERS_ROUTE.path,
            //     Component: FreelancersPage
            // },
            {
                path: BLOGS_ROUTE.path,
                Component: BlogsPage
            },
            {
                path: BLOG_UPDATE_ROUTE.path,
                Component: BlogEditPage
            },
            {
                path: LOGIN_ROUTE.path,
                Component: AuthPage
            },
            {
                path: REGISTRATION_ROUTE.path,
                Component: AuthPage
            },
        ]
    }
]