export type User = {
    id?: number,
    name: string,
    username: string,
    email?: string,
    password?: string
}

export type Post = {
    id?: number,
    date?: Date,
    name?: string,
    likes?: number,
    liked?: boolean,
    text: string,
    userId?: number,
    lastname?: string,
    username?: string,
    email?: string,
    threadId?: number
}