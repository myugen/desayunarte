import { UserShuffleService } from "../userShuffleService";
import { User } from "@/models";

describe("UserShuffleService", () => {
  let users: User[] = [];

  beforeAll(() => {
    users = require("@/data/users.json").users as User[];
  });

  it("given an array of users should return shuffled users group by turns", () => {
    const service = new UserShuffleService();
    const result = service.shuffle(users.slice(0, 11));
    expect(Array.from(result.keys()).length).toEqual(2);
  });
});
