const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  tokenName: 'boilerplateToken',
  roles: {
    admin: 'admin',
    user: 'user',
  },
  paging: {
    perPage: 25,
  },
};

export default config;
