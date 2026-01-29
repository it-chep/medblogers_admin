import { useEffect, useMemo, useState } from "react";
import { MyInput } from "../../../shared/ui/myInput";

interface IProps<T> {
    items: T[];
    setItemsSearch: (items: T[]) => void;
}

export function Search<T extends {name: string}>({items, setItemsSearch}: IProps<T>) {

    const [value, setValue] = useState<string>('')

    const searchItems = useMemo(() => {
        return items.filter(item => item.name.includes(value))
    }, [value, items])

    useEffect(() => {
        setItemsSearch(searchItems)
    }, [searchItems])

    return (
        <MyInput placeholder="Поиск..." value={value} setValue={setValue} />
    )
}