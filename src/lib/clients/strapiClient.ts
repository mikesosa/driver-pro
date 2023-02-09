import ApiClientSingleton from '@/lib/apiSingleton';

const strapiClient = ApiClientSingleton.getApiInstance(
  process.env.NEXT_PUBLIC_DRIVER_PRO_API_URL,
  'application/json'
);

export default strapiClient;
