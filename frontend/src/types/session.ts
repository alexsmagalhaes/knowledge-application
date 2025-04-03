export type Session = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  iat: number;
  exp: number;
  token: string;
};
