const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  paging: {
    perPage: 25,
  },
  roles: {
    user: 'user',
    admin: 'admin',
  },
  languages: {
    english: {
      name: 'English',
      code: 'en',
    },
    japanese: {
      name: 'Japanese',
      code: 'jp',
    },
  },
  languageStorageName: 'lng',
};

export default config;
