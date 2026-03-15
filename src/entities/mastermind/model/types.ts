export interface IMastermindItem {
    mmId: number;
    mmDatetime: string;
    name: string;
    createdAt: string;
    status: string;
    activity: boolean;
    mmLink: string;
}

export interface ICreateMMRequest {
    mmDatetime: string;
    name: string;
    mmLink: string;
}
