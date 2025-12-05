import { FC } from "react";
import classes from './deleteFigure.module.scss'

interface IProps {
    selectedFigure: string;
    setSelectedFigure: (selectedFigure: string) => void;
}

export const DeleteFigure: FC<IProps> = ({selectedFigure, setSelectedFigure}) => {

    const deleteSel = () => {
        const sel = window.getSelection()
        if(sel){
            sel.removeAllRanges()
        }
    }

    const onDeleteImage = async () => {
        try{
            // await userService.deleteImage('3', selectedFigure)

        }
        catch(e){
            console.log(e)
        }
        finally{

        }
    }

    const onDelete = async () => {
        const target = document.querySelector(`[data-id="${selectedFigure}"]`) 
        if(target){
            const parentFigure = target.parentElement;
            if(parentFigure){
                if(!selectedFigure.includes('video')){
                    onDeleteImage()
                }
                setSelectedFigure('')
                parentFigure.remove()
                deleteSel()
            }
        }
    }

    return (
        <section onClick={onDelete} className={classes.delete}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.6874 5.66666C11.6874 5.07986 12.1631 4.60416 12.7499 4.60416H21.2499C21.8367 4.60416 22.3124 5.07986 22.3124 5.66666C22.3124 6.25345 21.8367 6.72916 21.2499 6.72916H12.7499C12.1631 6.72916 11.6874 6.25345 11.6874 5.66666ZM6.02075 10.2C6.02075 9.61319 6.49645 9.13749 7.08325 9.13749H26.9166C27.5034 9.13749 27.9791 9.61319 27.9791 10.2C27.9791 10.7868 27.5034 11.2625 26.9166 11.2625H26.5624V25.5436C26.5624 27.6872 24.8032 29.3958 22.6666 29.3958H11.3333C9.19662 29.3958 7.43742 27.6872 7.43742 25.5436V11.2625H7.08325C6.49645 11.2625 6.02075 10.7868 6.02075 10.2ZM9.56242 11.2625V25.5436C9.56242 26.4826 10.3391 27.2708 11.3333 27.2708H22.6666C23.6608 27.2708 24.4374 26.4826 24.4374 25.5436V11.2625H9.56242ZM14.1666 14.717C14.7534 14.717 15.2291 15.1926 15.2291 15.7795V22.7538C15.2291 23.3407 14.7534 23.8163 14.1666 23.8163C13.5798 23.8163 13.1041 23.3407 13.1041 22.7538V15.7795C13.1041 15.1926 13.5798 14.717 14.1666 14.717ZM19.8333 14.717C20.42 14.717 20.8958 15.1926 20.8958 15.7795V22.7538C20.8958 23.3407 20.42 23.8163 19.8333 23.8163C19.2465 23.8163 18.7708 23.3407 18.7708 22.7538V15.7795C18.7708 15.1926 19.2465 14.717 19.8333 14.717Z" />
            </svg>
        </section>
    )
}