import {RouteObject} from "react-router-dom";
import App from "../../App";
import {
    BLOG_UPDATE_ROUTE,
    BLOGS_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE
} from "./routes";
import HomePage from "../../pages/home/Home";
import BlogsPage from "../../pages/blogs/Blogs";
import BlogEditPage from "../../pages/blogEdit/BlogEdit"
import AuthPage from "../../pages/auth/Auth";
import DoctorsPage from "../../pages/doctors/doctors/Doctors";
import DoctorPage from "../../pages/doctor/DoctorPage";
import { DOCTORS_CITIES_ROUTE, DOCTORS_ROUTE, DOCTORS_SPECIALITIES_ROUTE, DOCTORS_UPDATE_ROUTE } from "./doctor/doctorRoutes";
import DoctorsLayoutPage from "../../pages/doctors/DoctorsLayout";
import DoctorsCitiesPage from "../../pages/doctors/cities/DoctorsCititesPage";
import DoctorsSpecialitiesPage from "../../pages/doctors/specialities/DoctorsCititesPage";
import { FREELANCERS_CITIES_ROUTE, FREELANCERS_ROUTE, FREELANCERS_SPECIALITIES_ROUTE, FREELANCERS_UPDATE_ROUTE } from "./freelancer/freelancerRoutes";
import FreelancersLayoutPage from "../../pages/freelancers/FreelancersLayout";
import FreelancersPage from "../../pages/freelancers/freelancers/Freelancers";
import FreelancersCitiesPage from "../../pages/freelancers/cities/FreelancersCititesPage";
import FreelancersSpecialitiesPage from "../../pages/freelancers/specialities/FreelancersSpecialitiesPage";
import FreelancerPage from "../../pages/freelancer/Freelancer";
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
                path: FREELANCERS_ROUTE.path,
                Component: FreelancersLayoutPage,
                children: [
                    {
                        path: FREELANCERS_ROUTE.path,
                        Component: FreelancersPage
                    },
                    {
                        path: FREELANCERS_CITIES_ROUTE.path,
                        Component: FreelancersCitiesPage
                    },
                    {
                        path: FREELANCERS_SPECIALITIES_ROUTE.path,
                        Component: FreelancersSpecialitiesPage
                    }
                ]
            },
            {
                path: FREELANCERS_UPDATE_ROUTE.path,
                Component: FreelancerPage
            },
            {
                path: DOCTORS_ROUTE.path,
                Component: DoctorsLayoutPage,
                children: [
                    {
                        path: DOCTORS_ROUTE.path,
                        Component: DoctorsPage
                    },
                    {
                        path: DOCTORS_CITIES_ROUTE.path,
                        Component: DoctorsCitiesPage
                    },
                    {
                        path: DOCTORS_SPECIALITIES_ROUTE.path,
                        Component: DoctorsSpecialitiesPage
                    }
                ]
            },
            {
                path: DOCTORS_UPDATE_ROUTE.path,
                Component: DoctorPage
            },
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