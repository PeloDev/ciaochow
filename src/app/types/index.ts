export interface AppUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: true;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
