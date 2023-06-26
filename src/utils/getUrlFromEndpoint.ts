const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getUrlFromEndpoint = (endpoint: string, limit?: string | null) => {
  return `${baseUrl}${endpoint}?_limit=${limit ?? 20}`;
};

export default getUrlFromEndpoint;
