import getLimit from './getLimit';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getUrlFromEndpoint = (endpoint: string) => {
  const limit = getLimit();
  return `${baseUrl}${endpoint}?_limit=${limit ?? 20}`;
};

export default getUrlFromEndpoint;
