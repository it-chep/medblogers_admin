import { FC, RefObject, useEffect, useState } from "react";
import classesHeader from './header.module.scss'
import { SelectedRange } from "../selectedRange/SelectedRange";
import { ChangeParagraph } from "../changeParagraph/ChangeParagraph";
import { BgDiv } from "../bgDiv/BgDiv";
import { DeleteFigure } from "../deleteFigure/DeleteFigure";
import { ImageResize } from "../imageResize/ImageResize";
import { MyInput } from "../../../../shared/ui/myInput";

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

    return (
        <section 
            className={classesHeader.header}
            id="change_header"
        >
            <section className={classesHeader.change}>
                {
                    selectedFigure
                        ?
                    <>
                        <ImageResize 
                            selectedFigure={selectedFigure}
                        />
                        <DeleteFigure 
                            selectedFigure={selectedFigure}
                            setSelectedFigure={setSelectedFigure}
                        />
                    </>
                        :
                    <>
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
                    </>
                }
            </section>
        </section>
    )
}