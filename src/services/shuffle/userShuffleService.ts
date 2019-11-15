import { ShuffleService } from "./shuffleService";
import { User } from "@/models";

export class UserShuffleService implements ShuffleService<User> {
  shuffle(users: User[]): Map<number, User[]> {
    const shuffledUsers = this.fisherYatesShuffleAlgorithm(users);
    const groupedUsers = this.groupUsersByTurn(shuffledUsers);
    return groupedUsers;
  }

  private fisherYatesShuffleAlgorithm(collection: User[]): User[] {
    return collection
      .map(item => [Math.random(), item]) //[{random Number}, {User}]
      .sort(
        (current, previous) => (current[0] as number) - (previous[0] as number)
      )
      .map(a => a[1] as User);
  }

  private groupUsersByTurn(users: User[]): Map<number, User[]> {
    const turns = Math.floor(users.length / 6) + 1;
    const offset = Math.floor(users.length / turns);

    const usersPerTurn = new Map<number, User[]>();
    for (let turn = 0; turn < turns; turn++) {
      const usersOnTurn = users.splice(0, offset);
      usersPerTurn.set(turn, usersOnTurn);
    }

    users.forEach((user, index) => {
      const usersCurrentTurn = usersPerTurn.get(index % turns)!;
      usersCurrentTurn.push(user);
    });

    return usersPerTurn;
  }
}
