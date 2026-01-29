import { DoctorsMocks } from "./doctors/DoctorsMocks";



const mocks: {[key: string]: any} = {
    ...DoctorsMocks,
    
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