export interface User {
  id: number;
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: string;
  imageUrl: string;
  roles: string;
  authorities: Authority[];
}

export interface Authority {
  authority: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface JwtToken {
  token: string;
}
