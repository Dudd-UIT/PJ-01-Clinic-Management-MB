import {createAsyncThunk} from '@reduxjs/toolkit';
import getArticles from '../../services/newsService';
import translateText from '../../services/translateService';

export const fetchNewsAction = createAsyncThunk('fetchNews', async query => {
  try {
    const articles = await getArticles(query);
    const formatArticles = await Promise.all(
      articles.map(async article => {
        const vnTitle = await translateText(article.title, 'vi');
        return {
          title: vnTitle,
          img: article.urlToImage,
          path: article.url,
        };
      }),
    );
    return formatArticles;
  } catch (error) {
    return error.message;
  }
});
