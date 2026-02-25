import { User } from '../type';

export const users: User[] = [
  {
    id: '1',
    login: 'user@example.com',
    name: 'Сергей',
    password: 'password123',
  },
  {
    id: '2',
    login: 'user2@example.com',
    name: 'Вадим',
    password: 'password321',
  },
];
export const findUserByLogin = (login: string): User | undefined => {
  return users.find((user) => user.login === login);
};

export const findUserById = (id: string): Omit<User, 'password'> | undefined => {
  const user = users.find((user) => user.id === id);
  if (!user) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
