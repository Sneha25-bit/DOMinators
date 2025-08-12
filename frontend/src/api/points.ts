import axios from 'axios';

export const addUserPoints = (points: number) => {
  const token = localStorage.getItem('access_token');
  return axios.post(
    'https://dominators.onrender.com/api/users/add-points/',
    { points },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      withCredentials: true,
    }
  );
};
