import User from "./User";

test("a user should post a message to her/his personal timeline", () => {
  const user = new User("username", "password");
  //at the beginning, no messages posted
  expect(user.getTimeline().length).toBe(0);
  //after posting a message
  user.postMessage("this is my first message!");
  expect(user.getTimeline().length).toBe(1);
  //if the message content is empty: do not post the message
  user.postMessage("");
  expect(user.getTimeline().length).toBe(1);
});

test("a user should view his/her subscription list", () => {
    const user = new User("username", "password");
  //at the beginning, no subscriptions
  expect(user.getSubscriptions().length).toBe(0);
  });


