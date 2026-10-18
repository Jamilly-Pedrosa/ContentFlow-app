import { createContext, useContext, useState } from 'react';
import api from '../utils/api';

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  sign: (userData: User) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const sign = async (userData: User) => {
    try {
      const response = await api.post('/users', userData);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, sign }}>
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