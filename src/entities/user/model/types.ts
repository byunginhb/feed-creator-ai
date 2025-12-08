export type UserPlan = 'free' | 'pro' | 'enterprise';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  plan: UserPlan;
  createdAt: number; // timestamp
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}
