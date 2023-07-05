export interface IMessage {
    id: number,
    content: string,
    reply_to: number | null,
    modified_at: string,
    created_at: string,
}