const apiUrl = process.env.REACT_APP_API_URL;

const apiEndpoints = {
  categories: '/categories'
};

const buildApiUrl = (endpoint) => apiUrl + apiEndpoints[endpoint];

export default buildApiUrl;