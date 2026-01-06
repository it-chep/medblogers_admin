export {}
// import {useEffect, useState} from "react";
// import {HeaderData} from "../../widgets/headerData";
// import classes from './doctorEdit.module.scss'
// // import {ChangeDoctor} from "../../features/changeDoctor";
// import {LoaderSpinner} from "../../shared/ui/spinner";
// import {doctorService, useDoctorActions} from "../../entities/doctor/doctors";
// import {useParams} from "react-router-dom";
// import {useAppSelector} from "../../app/store/store";
// import {AuthError} from "../../shared/err/AuthError";
// import {useUserActions} from "../../entities/user";
// import {useGlobalMessageActions} from "../../entities/globalMessage";
// import {DoctorPreview} from "../../widgets/doctorPreview";
//
// export default function DoctorEditPage() {
//
//     const {id} = useParams<{ id: string }>()
//     const {doctor} = useAppSelector(s => s.doctorReducer)
//     const {setDoctor} = useDoctorActions()
//     const [isLoading, setIsLoading] = useState<boolean>(!doctor.body)
//     const {setGlobalMessage} = useGlobalMessageActions()
//     const {setIsAuth} = useUserActions()
//
//     const [isPreview, setIsPreview] = useState<boolean>(false)
//
//     const getData = async () => {
//         try {
//             if (id) {
//                 setIsLoading(true)
//                 const doctorRes = await doctorService.getDoctorByID(id)
//                 setDoctor(doctorRes)
//             }
//         } catch (e) {
//             console.log(e)
//             if (e instanceof AuthError) {
//                 setIsAuth(false)
//                 setGlobalMessage({message: e.message, type: 'error'})
//             } else {
//                 setGlobalMessage({message: 'Ошибка при получении статьи', type: 'error'})
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }
//
//     useEffect(() => {
//         getData()
//     }, [])
//
//     return (
//         <section className={classes.container + " wrapper_main"}>
//             {
//                 isLoading
//                     ?
//                     <section className={classes.loader}><LoaderSpinner/></section>
//                     :
//                     isPreview
//                         ?
//                         <DoctorPreview
//                             setIsPreview={setIsPreview}
//                         />
//                         :
//                         <section className={classes.content}>
//                             <section></section>
//                             <ChangeAdditionalSpecialities/>
//                             <ChangeAdditionalCities/>
//                             <SubscribersInfo/>
//                         </section>
//             }
//         </section>
//     )
// }