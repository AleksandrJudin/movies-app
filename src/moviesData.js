export default class {
  baseUrl = 'https://api.themoviedb.org/';

  apiKey = '9c89cd5a5bf43d8b842fd5f040f42645';

  getMoveData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  getMoveByKeyword = async (word) => {
    const url = `${this.baseUrl}3/search/movie?api_key=${this.apiKey}&language=ru-RU&query=${word}&page=1&include_adult=false`;
    const res = await this.getMoveData(url);
    return res;
  };

  getMoveGenre = async () => {
    const url = `${this.baseUrl}3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    const res = await this.getMoveData(url);
    return res;
  };
}
