import { NotificationType } from "../constants/enums/NotificationType.enum";
import { User } from "./user";

export interface UserNotification extends BaseEntity {
  type: NotificationType;
  message: string;
  seen: boolean;
  user: User;
  controller?: Controller | null | undefined;
}

export class UserNotification implements UserNotification {
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
