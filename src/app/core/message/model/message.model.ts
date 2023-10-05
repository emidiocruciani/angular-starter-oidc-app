export enum MessageType {
    Simple = 'SIMPLE',
    Info = 'INFO',
    Success = 'SUCCESS',
    Warning = 'WARNING',
    Error = 'ERROR',
}

export class Message {

    constructor(readonly content: string, readonly type: MessageType) {}
}
