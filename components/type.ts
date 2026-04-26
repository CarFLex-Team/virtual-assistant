export type MessageRole = 'user' | 'bot'
export type Message = {
id: string
role: MessageRole
content: string
timestamp: number
status?: 'sent' | 'delivered' | 'read' | 'typing'
}
export type StatPoint = { t: number; v: number }