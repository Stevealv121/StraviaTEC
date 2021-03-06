export interface ActivityI {
    username: string | null,
    date: string | null,
    duration: string | null,
    mileage: string | null,
    route: string | null,
    sportName: string,
    id: number | null,
    //FriendActivityValues
    friendUserName: string | null,
    level: string | null,
    activityId: number | null,
    firstName: string | null,
    secondName: string | null,
    firstSurname: string | null,
    secondSurname: string | null,
    birthDate: string | null,
    nationality: string | null,
    profilePicture: string | null,
    //blobRoute
    blobRoute: any,
    //CommentsButtons
    hasComments: boolean | null,
    moreComments: boolean | null,
    lessComments: boolean | null
}