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
    btnId: number | null, color: string | null, font: string | null, btn: string | null,
    //friend
    friendUserName: string | null,
    //blob
    blob: any
}