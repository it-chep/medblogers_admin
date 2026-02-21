import { FC, ReactNode, useMemo, useState } from "react";
import { IItem } from "../../model/types";
import classes from './selectedItems.module.scss'
import { LoaderSpinner } from "../spinner";

interface IProps {
    title?: ReactNode;
    items: IItem[];
    onSelected: (selected: IItem) => void;
    onDelete: (deleteItem: IItem) => void;
    selectedItems: IItem[];
    isLoading?: boolean;
    searchable?: boolean;
}

export const SelectedItems: FC<IProps> = ({title, items, onSelected, selectedItems, onDelete, isLoading, searchable}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const filteredItems = useMemo(() => {
        if (!search) return items
        return items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }, [items, search])

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
                {
                    searchable
                        &&
                    <li className={classes.searchBox}>
                        <input
                            className={classes.searchInput}
                            type="text"
                            placeholder="Поиск..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onMouseDown={e => e.stopPropagation()}
                        />
                    </li>
                }
                {filteredItems.map(item =>
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
