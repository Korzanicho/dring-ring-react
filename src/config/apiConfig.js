const apiUrl = process.env.REACT_APP_API_URL;

const apiEndpoints = {
  categories: '/categories',
  challenges: '/challenges',
};

const buildApiUrl = (endpoint) => apiUrl + apiEndpoints[endpoint];

export default buildApiUrl;