import axios from 'axios';
import translateText from './translateService';

const API_KEY = '80e30396d10349d4b899baa278488ad4';
const BASE_URL = 'https://newsapi.org/v2';

const getArticles = async (query) => {
  const enQuery = await translateText(query, 'en')
  console.log("ENGSUB >>>>>>> ", enQuery);
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: enQuery,
        pageSize: 5,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getArticles;
