import { DoctorsMocks } from "./doctors/DoctorsMocks";
import { FreelancersMocks } from "./freelancers/FreelancersMocks";



const mocks: {[key: string]: any} = {
    ...DoctorsMocks,
    ...FreelancersMocks
};

export async function findMock(url: string) {
    const mockKeys = Object.keys(mocks);
  
    for (const mockKey of mockKeys) {
        const regexPattern = mockKey.replace(/:\w+/g, '([^/]+)');
        const regex = new RegExp(`^${regexPattern}$`);
    
        if (regex.test(url)) {
            return { 
                async json(){
                    return mocks[mockKey];
                }
            }
        }
    }
  
    return null;
}