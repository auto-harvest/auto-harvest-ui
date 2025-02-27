import { NotificationType } from "../enums/NotificationType.enum";
import { User } from "./User";

export interface IUserNotification extends BaseEntity {
  type: NotificationType;
  message: string;
  seen: boolean;
  user: User;
  controller?: Controller | null | undefined;
}

export class UserNotification implements IUserNotification {
  constructor() {
    this.id = "";
    this.type = NotificationType.Info;
    this.message = "";
    this.seen = false;
    this.user = new User();
    this.controller = null;
  }

  constructor(
    public id: string,
    public type: NotificationType,
    public message: string,
    public seen: boolean,
    public user: User,
    public controller?: Controller | null | undefined
  ) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.seen = seen;
    this.user = user;
    this.controller = controller;
  }
}
