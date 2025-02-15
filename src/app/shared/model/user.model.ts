export interface User {
  id?: number;
  publicId?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  address: string;
  image_url?: string;
  roles?: string;
  authorities?: Authority[];
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
