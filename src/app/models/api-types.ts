export interface AuthCredentials {
  email: string;
  password: string;
}
export interface OauthToken {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface User {
  name: string;
}
export interface UserSession {
  user: User;
}

