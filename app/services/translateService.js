import axios from 'axios';

const API_KEY = 'AIzaSyCw85TZpUrI4zxv0UDWy60hbR-vXR_tev0';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(BASE_URL, null, {
      params: {
        q: text,
        target: targetLanguage,
        key: API_KEY,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export default translateText;
