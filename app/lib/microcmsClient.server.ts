import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? 'dummyDomain',
  apiKey: process.env.MICROCMS_API_KEY ?? 'dummyKey',
});
