import useFetch from 'use-http';

const API_BASE_URL = 'https://mercedes-benz.audru.com.ar';

const useFetchApi = () => {
  const { get, post, response } = useFetch(API_BASE_URL, {
    headers: { 'Content-Type': 'text/plain' },
    persist: true,
    cacheLife: 10 * 60 * 1000, // 10 minutes
  });

  const request = async (apiEndpoint: string, body = undefined) => {
    let result;
    if (body) {
      result = await post(apiEndpoint, body);
    } else {
      result = await get(apiEndpoint);
    }

    if (response.ok) {
      return result;
    } else {
      throw new Error('Fetch failed');
    }
  };

  return { request };
};
export default useFetchApi;
