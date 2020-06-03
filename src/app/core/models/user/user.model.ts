export interface User {
  success: boolean;
  error?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}
