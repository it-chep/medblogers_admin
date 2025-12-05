import { FC, RefObject, useEffect, useState } from "react";
import classesHeader from './header.module.scss'
import { SelectedRange } from "../selectedRange/SelectedRange";
import { ChangeParagraph } from "../changeParagraph/ChangeParagraph";
import { decoder } from "../../../../shared/lib/helpers/decoder";
import { BgDiv } from "../bgDiv/BgDiv";
import { DeleteFigure } from "../deleteFigure/DeleteFigure";

interface IProps {
    contentRef: RefObject<HTMLDivElement | null>
    range: Range | null;
    getRange: () => Range | null;
    newSelection: (range: Range, selectionClass: string) => ChildNode[];
    selectionClasses: {[key: string]: boolean};

    newRange: () => void;

    selectedFigure: string;
    setSelectedFigure: (selectedFigure: string) => void;
}

export const HeaderChange: FC<IProps> = (
    {
        contentRef, range, newSelection, getRange, selectionClasses, 
        newRange, selectedFigure, setSelectedFigure
    }
) => {

    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if(!range) return
        if(range.collapsed){
            setOpen(false)
        }
        else{
            setOpen(true)
        }
    }, [range])

    const onPublish = () => {
        if(contentRef.current){
            // decoder(contentRef.current, links)
        }
    }

    return (
        <section 
            onMouseDown={e => e.preventDefault()}
            className={classesHeader.header}
        >
            <section className={classesHeader.change}>
                <ChangeParagraph 
                    contentRef={contentRef}
                    range={range}
                />
                <SelectedRange 
                    newSelection={newSelection}
                    getRange={getRange}
                    selectionClasses={selectionClasses}
                    open={open}
                />
                <BgDiv  
                    contentRef={contentRef}
                    range={range}
                    newRange={newRange}
                />
                {
                    selectedFigure
                        &&
                    <DeleteFigure 
                        selectedFigure={selectedFigure}
                        setSelectedFigure={setSelectedFigure}
                    />
                }
            </section>
        </section>
    )
}