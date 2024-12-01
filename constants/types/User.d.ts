import { Controller } from "./Controller";

export interface User extends BaseEntity {
  username: string;
  email: string;
  password: string;
  controllers: Array<Controller>;
}

export class User implements User {
  constructor() {
    this.id = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.controllers = [];
  }

  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public controllers: Array<Controller>
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.controllers = controllers;
  }
}
