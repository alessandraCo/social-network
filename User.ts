import Message from "./Message";

class User {
    private static ids : number = 0;

    private userId : number = User.ids;
    private username : string;
    private password : string;

    private timeline : Message[] = [];
    private subscriptions : string[] = [];
    private directMessage : Message[] = [];

    public constructor(username : string, password : string) {
        this.username = username;
        this.password = password;
        User.ids++;
    }

    public getUserId() : number {
        return this.userId;
    }

    public getUsername() : string {
        return this.username;
    }

    public getPassword() : string {
        return this.password;
    }

    public getTimeline() : Message[] {
        return this.timeline;
    }

    public getSubscriptions() : string[] {
        return this.subscriptions; 
    }

    public getDirectMessage() : Message[] {
        return this.directMessage;
    }

    public addNewDirectMessage(newMessage : Message) : void {
        this.directMessage.push(newMessage);
    }

    public printMyDirectMessages() : void {
        if(this.directMessage.length === 0) {
            console.log("No private messages yet yet");
            return;
        } else {
            this.directMessage.forEach(message => {
                console.log("___________________");
                console.log("Date: " + message.getDate().toLocaleDateString());
                console.log("-------------------");
                console.log("From: " + message.getAuthorUsername());
                console.log("-------------------");
                console.log(message.getContent());
                console.log("___________________");
            });
        }
    }

    public addSubscription(newSubUsername : string) : void {
        this.subscriptions.push(newSubUsername);
    }

    public printMySubscription() : void {
        if(this.subscriptions.length === 0) {
            console.log("No subscriptions yet");
            return;
        } else {
            this.subscriptions.forEach(sub => {
                console.log("subscribed to: " + sub);
            });
            return;
        }
    }

    public postMessage(text : string) : boolean {
        //invalid input text
        if(text === null || text === "") {
            console.log("Error: empty content");
            return false;
        }
        //valid input text
        else {
            const newMessage : Message = new Message(this.username, text);
            this.timeline.push(newMessage);
            console.log("New message posted!");
            return true;
        }
    }

    public printMyTimeline() : void {
        if(this.timeline.length === 0) {
            console.log("No posted messages yet");
            return;
        } else {
            this.timeline.forEach(message => {
                console.log("___________________");
                console.log("Date: " + message.getDate().toLocaleDateString());
                console.log("-------------------");
                console.log(message.getContent());
                console.log("___________________");
            });
            return;
        }
    }


}

export default User;