


export class AuthError extends Error {

    constructor(message: string){
        super(message)
    }    

}

export class MyError extends Error {

    status: number;

    constructor(message: string, status: number){
        super(message)
        this.status = status;
    }

}