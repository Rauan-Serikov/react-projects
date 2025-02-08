export const getInitials = (name: string | null, surname: string | null) => {
    if ( name === null || surname == null) {
        return
    }
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
};