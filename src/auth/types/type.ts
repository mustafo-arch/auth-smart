export interface User {
  id: string;
  phone: string;
  role: string;
  schoolId: string | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  isNewDevice?: boolean;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}