import { FC } from "react";
import { ChangeAdditionalCityFreelancer } from "./city/ChangeAdditionalCity";
import { ChangeAdditionalSpecialityFreelancer } from "./spec/ChangeAdditionalSpeciality";
import { ChangeSocialNetwork } from "./socialNetworks/ChangeSocialNetwork";


interface IProps {
    freelancerId: number;
}

export const ChangeAdditionalFreelancer: FC<IProps> = ({freelancerId}) => {


    return (
        <>   
            <ChangeAdditionalCityFreelancer freelancerId={freelancerId} />
            <ChangeAdditionalSpecialityFreelancer freelancerId={freelancerId} />
            <ChangeSocialNetwork freelancerId={freelancerId} />
        </>
    )
}