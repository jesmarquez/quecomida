
import type { AuthResponse } from '../interfaces/auth.response';

export const useAuth = () => {

  const setAuthentication = ( dataAuth: AuthResponse) => {
    const { vendor, token } = dataAuth;
    const { name, email} = vendor;
    localStorage.setItem('name', name );
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
   
    return ;
  }

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token === null) return false;
    return true;
    
  }

  const getAuthentication = () => {
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token')  
    }
  }

  const logout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
  return {
    setAuthentication,
    isAuthenticated,
    getAuthentication,
    logout
  }
}