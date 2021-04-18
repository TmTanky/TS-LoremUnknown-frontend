export interface Iregister {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    __v?: number;
}

export interface Ilogin {
    email: string;
    password: string;
}

export interface Ierrors {
    errors: string[];
}
export interface IcurrentUser {
    status: number;
    loggedInUser: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
    }
    token: string;
}

export interface Icomments {
    _id: string;
    comment: string;
    commentBy: Iregister;
    commentLikes: Iregister[];
    replies: Iregister[]
}

export interface Iposts {
    comments: Icomments[];
    likes: Iregister[];
    _id: string;
    content: string;
    postedBy: Iregister;
    __v?: number;
    isHidden: boolean;
}