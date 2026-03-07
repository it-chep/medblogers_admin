import { FC} from "react";
import classes from './headerData.module.scss'
import { HeaderChange } from "../headerChange/HeaderChange";
import { HeaderInfo } from "../headerInfo/HeaderInfo";
import { HeaderChangeCategories } from "../headerChangeCategories/HeaderChangeCategories";
import { ChangeDoctorBlog } from "../../../../features/changeDoctorBlog";

interface IProps {
    setIsPreview: (isPreview: boolean) => void;
}

export const HeaderData: FC<IProps> = ({setIsPreview}) => {

    return (
        <section className={classes.container}>
            <HeaderInfo />
            <ChangeDoctorBlog />
            <HeaderChangeCategories />
            <HeaderChange
                setIsPreview={setIsPreview}
            />
        </section>
    )
}