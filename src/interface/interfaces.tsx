export interface Iregister {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string
}

export interface Ilogin {
    email: string;
    password: string;
}

export interface Ierrors {
    errors: string[]
}