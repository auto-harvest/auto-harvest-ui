export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  controllers: string[]; // Array of ObjectId references to Controller
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupResponse {
  token: string;
  user: User;
}
