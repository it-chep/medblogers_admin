import React, { FC, useMemo, useState } from "react";
import { IItem } from "../../model/types";
import classes from './selectedItem.module.scss'
import { MyInput } from "../myInput";

interface IProps {
    sign?: string | React.ReactElement;
    items: IItem[];
    onSelected: (selected: IItem) => void;
    selectedItem?: IItem;
}

export const SelectedItem: FC<IProps> = ({sign, items, onSelected, selectedItem}) => {

    const [open, setOpen] = useState<boolean>(false)

    const onSelectedWrap = (item: IItem) => {
        onSelected(item)
    }

    const [value, setValue] = useState<string>('')
    
    const searchItems = useMemo(() => {
        return items.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    }, [value, items])

    return (
        <section className={classes.container}>
            {
                open
                    &&
                <section  
                    onClick={() => setOpen(false)}
                    className={classes.darken}
                />
            }
            <section 
                className={classes.text}
                onClick={() => setOpen(!open)}
                onMouseDown={e => e.preventDefault()}
            >
                <span>{sign || 'Выбрать'}</span>{selectedItem && <span className={classes.name}>: {selectedItem.name}</span>}
            </section>
            <section className={classes.wrapper + (open ? ` ${classes.open}` : '')}> 
                <section>
                    <MyInput placeholder="Поиск..." value={value} setValue={setValue} />
                </section>
                {
                    searchItems.length > 0
                        &&
                    <ul className={classes.items + (open ? ` ${classes.open}` : '')}>
                        {searchItems.map(item => 
                            <li 
                                className={classes.item  + ((selectedItem && selectedItem.id) === item.id ? ` ${classes.selected}` : '')}
                                key={item.id}
                                onClick={() => onSelectedWrap(item)}
                                onMouseDown={e => e.preventDefault()}
                            >
                                {item.name}
                            </li>
                        )}
                    </ul>
                }
            </section>
        </section>
    )
}