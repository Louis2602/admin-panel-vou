export type USER_ROLE = "admin" | "user";
export type STATUS = "ACTIVE" | "INACTIVE";

export type User = {
  id?: string;
  name: string;
  username: string;
  password?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  gender?: string;
  dateOfBirth?: string;
  role: USER_ROLE;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdatedUser = {
  username: string;
  password: string;
  email: string;
  role?: USER_ROLE;
  isActive: boolean;
  status?: STATUS;
};
