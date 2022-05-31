export interface UserI {
    userName: string | null,
    password: string | null,
    firstName: string | null,
    secondName: string | null,
    firstSurname: string | null,
    secondSurname: string | null,
    birthDate: string | null,
    nationality: string | null,
    profilePicture: string | null,
    level: string | null,
    // addfriendbutton options
    btnId: number, color: string, font: string, btn: string,
    //friend
    friendUserName: string | null
}