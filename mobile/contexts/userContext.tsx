import { createContext, useContext, useState } from 'react';
import api from '../utils/api';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string; 
};

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  createUser: (userData: User) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const createUser = async (userData: User) => {
    try {

      const user = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
      }
      const response = await api.post('/createUser', user);
      setUser(response.data);
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error.response?.data);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      setUser(response.data);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.response?.data);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, createUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}