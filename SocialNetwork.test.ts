import Message from "./Message";
import SocialNetwork from "./SocialNetwork";
import User from "./User";

test("each user as a unique username", () => {
  //initializing userList
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  const registration1: boolean = socialNetworkTester.registerNewUser(
    "username",
    "password"
  );
  expect(registration1).toBeTruthy();
  const registration2: boolean = socialNetworkTester.registerNewUser(
    "username",
    "password"
  );
  expect(registration2).toBeFalsy();
  const registration3: boolean = socialNetworkTester.registerNewUser(
    "username2",
    "password"
  );
  expect(registration3).toBeTruthy();
});

test("a user should login correctly", () => {
  //initializing social network user list
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  socialNetworkTester.registerNewUser("username", "password");
  //valid login
  const loggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "password"
  );
  expect(loggedUser).not.toEqual(undefined);
  //invalid login
  const invalidLoggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "incorrectPassword"
  );
  expect(invalidLoggedUser).toEqual(undefined);
});

test("a user should view anyone timeline", () => {
  //initializing social network user list
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  socialNetworkTester.registerNewUser("username", "password");
  //login
  const loggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "password"
  );
  expect(loggedUser).not.toEqual(undefined);
  //searching friend by name
  const friendName: string = "mario";
  if (loggedUser !== undefined) {
    let userFound: User | undefined = socialNetworkTester.findByName(
      loggedUser,
      friendName
    );
    //if the user searched is not registered yet
    expect(userFound).toEqual(undefined);
    let timeLine: Message[] | undefined = socialNetworkTester.viewTimeline(
      loggedUser,
      friendName
    );
    expect(timeLine).toBe(undefined);
    socialNetworkTester.registerNewUser(friendName, "aPassword");
    userFound = socialNetworkTester.findByName(loggedUser, friendName);
    expect(userFound?.getUsername()).toBe(friendName);
    //view timeline
    timeLine = socialNetworkTester.viewTimeline(loggedUser, friendName);
    expect(timeLine).not.toBe(undefined);
  }
});

test("a user should subscribe to anyone timeline", () => {
  //initializing social network user list
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  socialNetworkTester.registerNewUser("username", "password");
  //login
  const loggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "password"
  );
  expect(loggedUser).not.toEqual(undefined);
  //searching user
  const userToFollow: string = "mario";
  socialNetworkTester.registerNewUser(userToFollow, "password");
  if (loggedUser !== undefined) {
    const userFound: User | undefined = socialNetworkTester.findByName(
      loggedUser,
      userToFollow
    );
    expect(userFound).not.toEqual(undefined);
    const followed: boolean = socialNetworkTester.followUser(
      loggedUser,
      userToFollow
    );
    expect(followed).toBeTruthy();
  }
});

test("a user should not subscribe to herself/himself", () => {
  //initializing social network user list
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  socialNetworkTester.registerNewUser("username", "password");
  //login
  const loggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "password"
  );
  expect(loggedUser).not.toEqual(undefined);
  //the logged user search her/his username
  if (loggedUser !== undefined) {
    const followed: boolean = socialNetworkTester.followUser(
      loggedUser,
      loggedUser?.getUsername()
    );
    expect(followed).toBeFalsy();
  }
});

test("a user should view his/her subscription list", () => {
  //initializing social network user list
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  socialNetworkTester.registerNewUser("username", "password");
  const userToFollow: string = "mario";
  socialNetworkTester.registerNewUser(userToFollow, "password");
  //login
  const loggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "password"
  );
  expect(loggedUser).not.toEqual(undefined);
  //at the beginning, no subscriptions
  expect(loggedUser?.getSubscriptions().length).toBe(0);
  if (loggedUser !== undefined) {
    socialNetworkTester.followUser(loggedUser, userToFollow);
    expect(loggedUser?.getSubscriptions().length).toBe(1);
  }
});

test("a user should send private message to another user", () => {
  //initializing social network user list
  const socialNetworkTester: SocialNetwork = new SocialNetwork();
  socialNetworkTester.registerNewUser("username", "password");
  const userToMessage: string = "mario";
  socialNetworkTester.registerNewUser(userToMessage, "password");
  //login
  const loggedUser: User | undefined = socialNetworkTester.login(
    "username",
    "password"
  );
  expect(loggedUser).not.toEqual(undefined);
  if (loggedUser !== undefined) {
    const messageSent: boolean = socialNetworkTester.sendPrivateMessage(
      loggedUser,
      userToMessage,
      "Hello"
    );
    expect(messageSent).toBeTruthy();
    //not privete message to himself/herself
    const messageNotSent: boolean = socialNetworkTester.sendPrivateMessage(
      loggedUser,
      loggedUser?.getUsername(),
      "Hello"
    );
    expect(messageNotSent).toBeFalsy();
  }
});
