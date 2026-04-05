
export interface UserLoginRequest{
    email: String,
    password: String
}

export interface AuthResp {
  token: string;
  id: number;
  name: string;
}

export interface ErrorResponse {
  message: string;
  dateTime: string;
}