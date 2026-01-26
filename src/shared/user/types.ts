export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  email: string;
  prefs: {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone_number: string;
    full_name: string;
  }
}

export interface SignInData {
  email: string;
  password: string;
}