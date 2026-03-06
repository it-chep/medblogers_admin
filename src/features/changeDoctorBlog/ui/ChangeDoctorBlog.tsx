import {FC, useEffect, useMemo, useState} from "react";
import classes from './changeDoctorBlog.module.scss'
import {useGlobalMessageActions} from "../../../entities/globalMessage";
import {useUserActions} from "../../../entities/user";
import {AuthError} from "../../../shared/err/AuthError";
import {useBlogActions} from "../../../entities/blog";
import {useAppSelector} from "../../../app/store/store";
import {SelectedItem} from "../../../shared/ui/selectedItem";
import {IItem} from "../../../shared/model/types";
import {doctorService, IDoctorItem} from "../../../entities/doctor";

export const ChangeDoctorBlog: FC = () => {

    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useUserActions()
    const [doctors, setDoctors] = useState<IDoctorItem[]>([])
    const {setDoctor} = useBlogActions()
    const {blog} = useAppSelector(s => s.blogReducer)

    const getDoctors = async () => {
        try {
            const doctorsRes = await doctorService.getDoctors()
            setDoctors(doctorsRes)
        } catch (e) {
            console.log(e)
            if (e instanceof AuthError) {
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            } else {
                setGlobalMessage({message: 'Ошибка при получении врачей', type: 'error'})
            }
        }
    }

    useEffect(() => {
        getDoctors()
    }, [])

    const doctorItems: IItem[] = useMemo(() => {
        return doctors.map(d => ({id: d.id, name: d.name}))
    }, [doctors])

    const selectedDoctor: IItem | undefined = useMemo(() => {
        if (blog.doctor.doctorId > 0) {
            return {id: blog.doctor.doctorId, name: blog.doctor.doctorName}
        }
        return undefined
    }, [blog.doctor])

    const onSelected = (item: IItem) => {
        setDoctor({doctorId: item.id, doctorName: item.name})
    }

    const onRemove = () => {
        setDoctor({doctorId: 0, doctorName: ''})
    }

    return (
        <section className={classes.container}>
            {
                blog.doctor.doctorId > 0
                    ?
                <section className={classes.doctor}>
                    <span>Автор</span>
                    <span className={classes.name}>{blog.doctor.doctorName}</span>
                    <span className={classes.remove} onClick={onRemove}>✕</span>
                </section>
                    :
                <section className={classes.select_doctor}>
                    <SelectedItem
                        sign="Автор"
                        items={doctorItems}
                        selectedItem={selectedDoctor}
                        onSelected={onSelected}
                    />
                </section>
            }
        </section>
    )
}
