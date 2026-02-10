import { FC, useState } from "react";
import { IItem } from "../../model/types";
import classes from './selectedItems.module.scss'
import { LoaderSpinner } from "../spinner";

interface IProps {
    title?: string;
    items: IItem[];
    onSelected: (selected: IItem) => void;
    onDelete: (deleteItem: IItem) => void;
    selectedItems: IItem[];
    isLoading?: boolean;
}

export const SelectedItems: FC<IProps> = ({title, items, onSelected, selectedItems, onDelete, isLoading}) => {

    const [open, setOpen] = useState<boolean>(false)

    const onSelectedWrap = (item: IItem) => {
        const isSelected = selectedItems.find(selectedItem => selectedItem.id === item.id)
        if(!isSelected){
            onSelected(item)
        }
        else{
            onDelete(item)
        }
    }

    return (
        <section className={classes.container}>
            <section 
                className={classes.text}
                onClick={() => setOpen(!open)}
                onMouseDown={e => e.preventDefault()}
            >
                {title || 'Выбрать'}
            </section>
            <ul className={classes.items + (open ? ` ${classes.open}` : '')}>
                {
                    isLoading
                        &&
                    <section className={classes.loader}>
                        <LoaderSpinner />
                    </section>
                }
                {items.map(item => 
                    <li 
                        className={classes.item  + (selectedItems.find(selectedItem => selectedItem.id === item.id) ? ` ${classes.selected}` : '')}
                        key={item.id}
                        onClick={() => onSelectedWrap(item)}
                        onMouseDown={e => e.preventDefault()}
                    >
                        {item.name}
                    </li>
                )}
            </ul>
        </section>
    )
}