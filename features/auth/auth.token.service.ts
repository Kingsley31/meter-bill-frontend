export const storeToken = (token: string) => {
  // For SSR/SSG apps, use httpOnly cookies via backend API
  document.cookie = `authToken=${token}; path=/; Secure; SameSite=Strict`;
};

export const getToken = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];
};

export const removeToken = () => {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};