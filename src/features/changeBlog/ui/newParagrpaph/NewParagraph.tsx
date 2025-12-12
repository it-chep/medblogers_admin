import { FC, RefObject, useEffect, useState } from "react";
import { PlusSvg } from "../../../../shared/lib/assets/PlusSvg";
import classes from './newParagraph.module.scss'
import { SelectedParagraph } from "../selectedParagraph/SelectedParagraph";

interface IProps {
    visible: boolean;
    opacity: boolean;
    top: number

    contentRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;

    onSelected: () => void;

    currrentElem: Element | null;

    setSelectedFigure: (selectedFigure: string) => void;
}

export const NewParagraph: FC<IProps> = ({
    visible, top, opacity, contentRef, containerRef, currrentElem, onSelected, setSelectedFigure
}) => {

    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if(!visible){
            setOpen(false)
        }
    }, [visible])

    return (
        <section 
            className={classes.container}
            style={{
                overflow: visible ? 'visible' : 'hidden',
                opacity: visible ? 1 : 0,
                transition: opacity ? 'opacity .4s ease' : '',
                top, 
            }}
        >
            <SelectedParagraph 
                containerRef={containerRef}
                contentRef={contentRef}
                currentElem={currrentElem}
                open={open}
                onSelected={onSelected}
                setSelectedFigure={setSelectedFigure}
            >
                <PlusSvg  />
            </SelectedParagraph>
        </section>
    )
}