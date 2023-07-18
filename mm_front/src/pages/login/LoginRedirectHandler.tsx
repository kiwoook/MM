import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginState {
  login: () => void;
}

const LoginRedirectHandler = ({ login }: LoginState) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.toString()).searchParams;
    const accessToken: string | null = params.get('token') ?? null;

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Set the access token in cookies
      document.cookie = `access_token=${accessToken}; path=/; expires=${new Date(Date.now() + 3600000).toUTCString()}`;
    }

    login();
    navigate('/');
  }, [login, navigate]);

  return null;
};

export default LoginRedirectHandler;