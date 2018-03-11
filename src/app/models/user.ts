export class User {
  constructor(public username?: string, public password?: string) {}
  getUserName(): string {
    return this.username;
  }
  getUserPass(): string {
    return this.password;
  }
}
