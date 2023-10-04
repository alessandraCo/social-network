class Message {
    private date : Date = new Date(Date.now());
    private authorUsername : string;
    private content : string;

    public constructor(authorUsername : string, content : string) {
        this.authorUsername = authorUsername;
        this.content = content;
    }

    public getDate() : Date {
        return this.date;
    }

    public getAuthorUsername() : string {
        return this.authorUsername;
    }

    public getContent() : string {
        return this.content;
    }
}

export default Message;