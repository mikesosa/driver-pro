export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  charge: null;
  firstName: string;
  lastName: string;
  credit: null;
  jwt?: string;
};
