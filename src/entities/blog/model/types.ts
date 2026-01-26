



export interface ISaveBlogImageRequest {
    blogId: string;
    imageData: ArrayBuffer;
}

export interface IImage {
    imageId: string;
    imageUrl: string;
}

export interface ISeo {
    prevTitle: string;
    prevOG: string;
}

export interface IBlogDoctor {
    doctorId: number;
    doctorName: string;
}

export interface IBlogCategory {
    id: number;
    name: string;
}

export interface IBlogRequest {
    blogId: string;
    slug: string;
    title: string;
    body: string;
    isActive: boolean;
    previewText: string; 
    societyPreview: string;
    additionalSeoText: string;
    orderingNumber: number;
    doctorId: number;
}

export interface IBlog {
    blogId: string;
    doctor: IBlogDoctor;
    categories: IBlogCategory[];
    slug: string;
    title: string;
    body: string;
    isActive: boolean;
    previewText: string; 
    societyPreview: string;
    additionalSeoText: string;
    orderingNumber: number;
}

export interface IBlogState {
    blog: IBlog;
    isLoading: boolean;
    error: string;
}

export interface IBlogItem {
    blogId: string;
    title: string;
    isActive: boolean;
    orderingNumber: number;
}

export interface IBlogMiniature {
    blogId: string;
    title: string;
    imageUrl: string;
    previewText: string;
    date: string;
}