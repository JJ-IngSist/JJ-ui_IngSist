export type User = {
    id?: number,
    name: string,
    username: string,
    email?: string,
    password?: string,
    description?: string
}

export type Post = {
    id?: number,
    date?: Date,
    name?: string,
    likes?: number,
    liked?: boolean,
    text: string,
    user?: number,
    username?: string,
    email?: string,
    threadId?: number,
    first?:boolean
}

export type ChangePassword = {
    oldPassword: string,
    password: string,
}

export type ConversationModel = {
    id?: number,
    user1?: number,
    user2?: number,
    messages?: string[]
}

export type Message = {

}