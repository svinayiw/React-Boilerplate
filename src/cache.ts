import { InMemoryCache } from '@apollo/client';

import fieldPolicy from './clientGraphql/fieldPolicy';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ...fieldPolicy,
      },
    },
  },
});

export default cache;
