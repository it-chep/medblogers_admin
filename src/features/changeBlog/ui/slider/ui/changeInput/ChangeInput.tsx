import { FC, useEffect, useState } from "react";
import classes from './changeInput.module.scss'
import { MyInput } from "../../../../../../shared/ui/myInput";

interface IProps {
    max: number;
    min: number;
    valueMax: number;
    onBlur: (valMax: number) => void;
}

export const ChangeInput: FC<IProps> = ({
    max, valueMax, onBlur, min
}) => {

    const [targetMax, setTargetMax] = useState<number>(valueMax)

    useEffect(() => {
        setTargetMax(valueMax)
    }, [valueMax])

    const check = (numb: number) => {
        if(numb > max){
            numb = max;
        }
        if(numb < min) {
            numb = min;
        }
        return numb;
    }
    
    const onTargetBlur = () => {
        const checkMax = check(targetMax) 
        onBlur(checkMax)
    }

    return (
        <section className={classes.inputs}>
            <MyInput 
                typeInput="number"
                value={`${targetMax}`}
                setValue={val => setTargetMax(+val)}
                onBlur={onTargetBlur}
                sign="до"
            />
        </section>
    )
}