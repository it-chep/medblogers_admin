import { FC, PropsWithChildren } from "react";
import classes from './blogItem.module.scss'
import { IBlogItem } from "../../model/types";
import { MyButton } from "../../../../shared/ui/myButton";
import { Link } from "react-router-dom";


interface IProps {
    blogItem: IBlogItem;
    ind: number;
}


export const BlogItem: FC<IProps & PropsWithChildren> = ({blogItem, ind, children}) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(blogItem.blogId)
    }

    return (
        <tr 
            className={classes.item}
        >
            <td>
                {ind}
            </td>
            <td onClick={handleCopy} className={classes.copy}>
                копировать
            </td>  
            <td>
                {blogItem.title}
            </td>
            <td>
                {blogItem.orderingNumber}
            </td>
            <td className={classes.feature}>
                {children}
            </td>
            <td className={classes.link}>
                <Link to={'/blogs/' + blogItem.blogId}>
                    <MyButton>
                        Подробнее
                    </MyButton>
                </Link>
            </td>
        </tr>
    )
}