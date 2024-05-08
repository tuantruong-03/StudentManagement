export const ValidateNameOfUser = (name: string): boolean => { // For firstName and lastName
    const regex = /^[A-ZÀ-Ỹ][a-zà-ý]*( [A-ZÀ-Ỹ][a-zà-ý]*)*$/;
    return regex.test(name);
}   



export const ValidateEmail = (email: string): boolean => { // For firstName and lastName
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+(?<!\.)$/;
    return regex.test(email);
}   



