import PromptSync from "prompt-sync";
import SocialNetwork from "./SocialNetwork";
import User from "./User";
import Message from "./Message";

const socialNetwork: SocialNetwork = new SocialNetwork();

function searchingFriendMenu(userLogged: User, username: string) {
  const prompt = PromptSync();
  const userFound: User | undefined = socialNetwork.findByName(
    userLogged,
    username
  );
  //user not found
  if (userFound === undefined) {
    console.log("User not found");
    return;
  }
  //user found
  else {
    console.log(
      "Commad list: F --> Follow this friend | V --> View friend's timeline | D --> Direct Message | Q --> Quit"
    );
    let choice = prompt("Insert your choice: ");
    while (choice !== "Q") {
      switch (choice) {
        case "F": {
          const followedOK: boolean = socialNetwork.followUser(
            userLogged,
            username
          );
          if (followedOK) {
            console.log("Subscriptions");
            userLogged.printMySubscription();
          } else {
            console.log("Ooops, something went wrong");
          }
          break;
        }
        case "V": {
          const timeLine: Message[] | undefined = socialNetwork.viewTimeline(
            userLogged,
            username
          );
          if (timeLine === undefined) {
            console.log("Ooops, something went wrong");
          } else {
            timeLine.forEach((message) => {
              console.log("___________________");
              console.log("Date: " + message.getDate().toLocaleDateString());
              console.log("-------------------");
              console.log(message.getContent());
              console.log("___________________");
            });
          }
          break;
        }
        case "D": {
          choice = prompt("insert message: ");
          const textMessage: string | null = choice;
          if (textMessage !== null) {
            socialNetwork.sendPrivateMessage(userLogged, username, textMessage);
          } else {
            console.log("You have insert no text");
          }
          break;
        }
        default: {
          console.log("Invalid choice. Please, select one of the following");
        }
      }
      console.log(
        "Commad list: F --> Follow this friend | V --> View friend's timeline | D --> Direct Message | Q --> Quit"
      );
      choice = prompt("Insert your choice: ");
    }
  }
}

function userLoggedMenu(userLogged: User): void {
  const prompt = PromptSync();
  console.log("Welcome " + userLogged.getUsername() + "!");
  console.log("#####################");
  console.log("Posted messages");
  userLogged.printMyTimeline();
  console.log("#####################");
  console.log("Subscriptions");
  userLogged.printMySubscription();
  console.log("#####################");
  console.log("Personal messages");
  userLogged.printMyDirectMessages();
  console.log("#####################");
  console.log(
    "Commad list: P --> Post a new message | S --> Search a friend | Q --> Quit"
  );
  let choice = prompt("insert your choice: ");
  while (choice !== "Q") {
    switch (choice) {
      case "P": {
        choice = prompt("Insert the message content: ");
        const content: string | null = choice;
        if (content !== null) {
          const messagePosted: boolean = userLogged.postMessage(content);
          if (messagePosted) {
            console.log("Posted messages");
            userLogged.printMyTimeline();
          } else {
            console.log("Error: something went wrong. Message not posted");
          }
        } else {
          console.log("invalid content");
        }
        break;
      }
      case "S": {
        choice = prompt("insert the username: ");
        const username: string | null = choice;
        if (username !== null) {
          searchingFriendMenu(userLogged, username);
        } else {
          console.log("invalid username");
        }
        break;
      }
      default: {
        console.log("Invalid choice. Please, select one of the following");
      }
    }
    console.log(
      "Commad list: P --> Post a new message | S --> Search a friend | Q --> Quit"
    );
    choice = prompt("insert your choice: ");
  }

  return;
}

function App() {
  const prompt = PromptSync();
  let userLogged: User | undefined = undefined;

  console.log("Welcome to A Social Network!");
  console.log("Command list: L --> Login | R --> Register in | Q --> Quit");
  let input = prompt("insert your choice: ");
  while (input !== "Q") {
    switch (input) {
      case "L": {
        input = prompt("insert username: ");
        const userIn: string = input;
        input = prompt("insert password: ");
        const passIn: string = input;
        userLogged = socialNetwork.login(userIn, passIn);
        //login failed
        if (userLogged === undefined) {
          console.log("Login failed: incorrect username or password");
        }
        //success login
        else {
          userLoggedMenu(userLogged);
        }
        break;
      }
      case "R": {
        input = prompt("insert username: ");
        //validing username input
        while (input.trim() === null || input.trim() === undefined) {
          console.log("invalid username");
          input = prompt("insert username: ");
        }
        const userIn: string = input;
        input = prompt("insert password: ");
        //validing password input
        while (input.trim() === null || input.trim() === undefined) {
          console.log("invalid password");
          input = prompt("insert password: ");
        }
        const passIn: string = input;
        const registrationOK: boolean = socialNetwork.registerNewUser(
          userIn,
          passIn
        );
        //registrationOK
        if (registrationOK) {
          console.log("You registered in! Now you can login");
        }
        //registrationKO
        else {
          console.log("Registration failed: something went wrong");
        }
        break;
      }
      default: {
        console.log("Invalid choice. Please, select one of the following");
      }
    }
    console.log("Command list: L --> Login | R --> Register in | Q --> Quit");
    input = prompt("insert your choice: ");
  }
}

export default App;
