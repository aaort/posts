// Fetcher method used as a second parameter of useSWR hook
const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint);

  return await response.json();
};

export default fetcher;
