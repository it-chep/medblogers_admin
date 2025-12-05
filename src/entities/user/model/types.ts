

export interface IUser {
    isAuth: boolean;
}

export interface IUserInitialState {
    user: IUser;
    isLoading: boolean;
    error: string;
}

