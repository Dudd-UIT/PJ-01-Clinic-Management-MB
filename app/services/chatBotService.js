// Chatbot.js
import axios from 'axios';
const TEXT_CORTEX_API_KEY =
  'gAAAAABmca1VZaBdAt2Ztvv89YvT14mPB4DCeKkj2icu8KEQVzMRbb2t8HMwS-m-zZ3mRSQYtP6KBDiNMYUwcb1SMwHBPLM8yQZ92B4kzW49IFck_wHY-x-bkqu2HATHEAGBGnp59S3m';

export const sendMessageToTextCortex = async message => {
  try {
    const response = await axios.post(
      'https://api.textcortex.com/v1/texts/completions',
      {
        model: 'sophos-1',
        target_lang: 'en',
        text: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEXT_CORTEX_API_KEY}`,
        },
      },
    );
    console.log('TEXT RESSSS =>>>>>> ', response);
    return response.data.data.outputs[0].text.trim();
  } catch (error) {
    console.error('Error sending message to Text Cortex:', error);
    throw error;
  }
};
