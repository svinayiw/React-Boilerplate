import { useEffect, useState } from 'react';
import { ApolloProvider, ApolloClient, ApolloLink } from '@apollo/client';
import { CContainer, CSpinner } from '@coreui/react';

import config from '../config';
import cache from '../cache';
import { authVar } from '../App/link';
import { renewAccessToken } from '../services/tokenService';
import { typeDefs } from '../clientGraphql/typeDefs';
import * as link from './link';
import './App.css';
import 'antd/dist/antd.css';

import Routes from './Routes';

const client = new ApolloClient({
  link: ApolloLink.from([
    //link.errorLink,
    link.refreshLink,
    link.authLink,
    link.httpLink,
  ]),
  cache,
  typeDefs,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    //query: {
    //errorPolicy: 'ignore',
    //},
    //mutate: { errorPolicy: 'ignore' },
  },
});

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    renewAccessToken()
      .then((response) => response.json())
      .then((response) => {
        if (response?.data?.role !== config.roles.admin) {
          return;
        }
        authVar({
          isLoggedIn: true,
          token: response?.data?.accessToken,
          user: {
            _id: response?.data?._id || null,
            role: response?.data?.role || null,
          },
        });
      })
      .finally(() => {
        setAppLoading(false);
      });
  }, []);

  return (
    <>
      {appLoading ? (
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <div className="text-center">
              <CSpinner style={{ width: '4rem', height: '4rem' }} />
              <p>Loading...</p>
            </div>
          </CContainer>
        </div>
      ) : (
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      )}
    </>
  );
}

export default App;
