import Message from "./Message";
import User from "./User";

class SocialNetwork {
  private usersList: User[] = [];

  public getUserList(): User[] {
    return this.usersList;
  }

  public isUniqueUsername(newUsername: string): boolean {
    for (let i = 0; i < this.usersList.length; i++) {
      const actualUser: User = this.usersList[i];
      if (actualUser.getUsername() === newUsername) {
        return false;
      }
    }
    return true;
  }

  public registerNewUser(username: string, password: string): boolean {
    //check valid username
    if (username === null || username === "") {
      console.log("invalid username. Please, choose a valid username");
      return false;
    } else {
      const validUsername: boolean = this.isUniqueUsername(username);
      if (validUsername) {
        //check valid password
        if (password === null || password === "") {
          console.log("invalid password. Please, choose a valid password");
          return false;
        } else {
          const newUser: User = new User(username, password);
          this.usersList.push(newUser);
          console.log("Registration completed! Now you can login");
          return true;
        }
      } else {
        console.log("This username is not available. Please, choose another one");
        return false;
      }
    }
  }

  public login(username : string, password : string) : User | undefined {
    const numOfUsers : number = this.usersList.length;
    for(let i=0; i<numOfUsers; i++) {
      if(this.usersList[i].getUsername() === username && this.usersList[i].getPassword() === password) {
        return this.usersList[i];
      }
    }
    return undefined;
  }

  //returns the user if there is a match in the users list; otherwise returns undefined
  public findByName(loggedUser : User, usernameToFind : string) : User | undefined {
    const numOfUsers : number = this.usersList.length;
    for(let i=0; i<numOfUsers; i++) {
      //if the username serached is present and it is not the logged user username
      if(this.usersList[i].getUsername() === usernameToFind && this.usersList[i].getUserId() !== loggedUser.getUserId()) {
        return this.usersList[i];
      }
    }
    return undefined;
  }

  public viewTimeline(loggedUser : User, username : string) : Message[] | undefined {
    const user : User | undefined = this.findByName(loggedUser, username);
    //if there is no user with the given username
    if(user === undefined) {
      console.log("No user found");
      return undefined;
    } 
    //if the user with the given username exists
    else {
      return user.getTimeline();
    }
  }

  public followUser(loggedUser : User, username : string) : boolean {
    const searchUser : User | undefined = this.findByName(loggedUser, username);
    if(searchUser !== undefined) {
      loggedUser.addSubscription(searchUser.getUsername());
      return true;
    } else {
      return false;
    }
  }

  public sendPrivateMessage(loggedUser : User, username : string, content : string) : boolean {
    const searchUser : User | undefined = this.findByName(loggedUser, username);
    if(searchUser !== undefined) {
      const newPrivateMessage : Message = new Message(loggedUser.getUsername(), content);
      searchUser.addNewDirectMessage(newPrivateMessage);
      return true;
     } else {
      return false;
     }
  }






}

export default SocialNetwork;
