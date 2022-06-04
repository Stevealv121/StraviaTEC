export interface CommentI {
    activity_id: number,
    author: string | null | undefined,
    date: string,
    content: string,
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    blobProfile: any
}