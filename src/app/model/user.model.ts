export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'costumer' | 'admin'
}

export interface CreateUserDTO extends Omit<User, 'id'> { }
