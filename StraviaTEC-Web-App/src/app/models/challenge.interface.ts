export interface ChallengeI {
    id: number,
    validThru: string,
    type: string,
    access: string,
    name: string,
    activityId: number,
    //Buttons
    color: string, font: string, btn: string
    //Progress
    progress: number | null;
    goal: number | null;
}