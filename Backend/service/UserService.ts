import type { Knex } from "knex";
import { checkPassword } from "../utils/hash";
import { table } from "../utils/table";
import { Gendertype, User } from "./model";

export class UserService {
  constructor(private knex: Knex) {}

  async checkLogin(email: string, password: string) {
    const queryResult = await this.knex<User>(table.USER)
      .select("id", "email", "password")
      .where("email", email)
      .first();
    if (queryResult && (await checkPassword(password, queryResult.password))) {
      const is_login = await this.knex<User>(table.USER)
        .select("id", "email", "password", "is_login")
        .where("email", email)
        .update({ is_login: true });
      return is_login && queryResult;
    }
    throw new Error("Invaild email or password");
  }

  async logout(id: number) {
    const userId = id;
    const queryResult = await this.knex<User>(table.USER)
      .select("is_login")
      .where("id", userId)
      .update({ is_login: false });
    return queryResult;
  }

  async register(email: string, password: string, username: string) {
    const queryResult = await this.knex<User>(table.USER).select(
      "email",
      "username"
    );
    queryResult.forEach((queryResult) => {
      if (queryResult.email == email) {
        throw new Error("This email already exists");
      }
      if (queryResult.username == username) {
        throw new Error("This username already exists");
      }
    });
    await this.knex<User>(table.USER).insert([
      {
        email,
        password,
        username,
        // , gender
      },
    ]);
  }

  async getProfileInfo(id: number) {
    const queryResult = await this.knex<User>(table.USER)
      .select("*")
      .where("id", id)
      .first(); // LIMIT 1
    return queryResult;
  }

  async updateUserInfo(params: {
    id: number;
    password: string;
    username: string;
    avatar: string;
    gender: Gendertype;
    date_of_birth: string;
    mobile: number;
    address: string;
  }) {
    const queryResult = await this.knex<User>(table.USER)
      .where("id", params.id)
      .update(params);
    return queryResult;
  }
}
