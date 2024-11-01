export interface User{
    id: string;
    email: string;
    emailVerified?: Date | null;
    password: string;
    role: string;
    name: string;
    image?: string | null;
}