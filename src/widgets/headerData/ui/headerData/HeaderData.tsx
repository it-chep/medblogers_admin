import { FC} from "react";
import classes from './headerData.module.scss'
import { HeaderChange } from "../headerChange/HeaderChange";
import { HeaderInfo } from "../headerInfo/HeaderInfo";
import { HeaderChangeCategories } from "../headerChangeCategories/HeaderChangeCategories";

interface IProps {
    setIsPreview: (isPreview: boolean) => void;
}

export const HeaderData: FC<IProps> = ({setIsPreview}) => {

    return (
        <section className={classes.container}>
            <HeaderInfo />
            <HeaderChangeCategories />
            <HeaderChange  
                setIsPreview={setIsPreview}
            />
        </section>
    )
}