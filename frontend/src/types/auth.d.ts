export interface IAuthSession {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  token: string;
  iat: number;
  exp: number;
}
