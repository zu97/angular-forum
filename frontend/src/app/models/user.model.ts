export interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface FieldError {
  message: string;
}

export interface RegisterError {
  errors: {
    email: FieldError;
    password: FieldError;
    name: FieldError;
  }
}

export interface LoginError {
  error: string;
}
