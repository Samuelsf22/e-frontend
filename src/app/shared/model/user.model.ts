export interface UserRequest {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  address: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface JwtToken {
  token: string;
}
