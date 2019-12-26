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
    const maxUsersOnTurn = Math.floor(users.length / turns);
    const usersOnDefaultTurn = this.getUsersWithDefaultTurns(users, turns);
    const usersToPairInTurns = users.filter(user => !user.default);
    const usersPerTurn = this.initUsersPerTurn(usersOnDefaultTurn, turns);
    for (let turn = 0; turn < turns; turn++) {
      const freeSlotOnTurn = maxUsersOnTurn - usersPerTurn.get(turn)!.length;
      const usersPairedInTurn = usersToPairInTurns.splice(
        0,
        freeSlotOnTurn < 0 ? 0 : freeSlotOnTurn
      );
      const dummy = usersPerTurn.get(turn)!.concat(usersPairedInTurn);
      usersPerTurn.set(turn, dummy);
    }

    usersToPairInTurns.forEach((user, index) => {
      const usersCurrentTurn = usersPerTurn.get(index % turns)!;
      usersCurrentTurn.push(user);
    });

    usersPerTurn.forEach(users => users.reverse());

    return usersPerTurn;
  }

  private getUsersWithDefaultTurns(
    users: User[],
    turns: number
  ): UsersWithDefaultTurn {
    return ["first", "last"].reduce(
      (previous, current) => ({
        ...previous,
        ...{
          [current === "first" ? 0 : turns - 1]: users.filter(
            user => user.default === current
          )
        }
      }),
      {}
    );
  }
  private initUsersPerTurn(
    usersOnDefaultTurn: UsersWithDefaultTurn,
    turns: number
  ): Map<number, User[]> {
    const usersInDefaultTurns = new Map<number, User[]>();
    for (let turn = 0; turn < turns; turn++) {
      usersInDefaultTurns.set(
        turn,
        usersOnDefaultTurn[turn] ? usersOnDefaultTurn[turn] : []
      );
    }

    return usersInDefaultTurns;
  }
}

interface UsersWithDefaultTurn {
  [turn: number]: User[];
}
