import { DurationI } from "./duration.interface";

export interface ActivityI {
    username: string | null,
    date: string | null,
    duration: DurationI,
    mileage: string | null,
    route: string[]
    sportName: string,
    id: number
}