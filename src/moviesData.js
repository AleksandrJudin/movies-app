export default class {
  baseUrl = 'https://api.themoviedb.org/';
  apiKey = '9c89cd5a5bf43d8b842fd5f040f42645';

  getMoveData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Data is not correct ${res.status}`);
    }

    const data = await res.json();
    return data;
  };

  getMoveByKeyword = async (word, page = 1) => {
    const url = `${this.baseUrl}3/search/movie?api_key=${this.apiKey}&language=ru-RU&query=${word}&page=${page}&include_adult=false`;
    const res = await this.getMoveData(url);
    return res;
  };

  getMoveGenre = async () => {
    const url = `${this.baseUrl}3/genre/movie/list?api_key=${this.apiKey}&language=ru-RU`;
    const res = await this.getMoveData(url);
    return res;
  };

  getGuestSessionId = async () => {
    const url = `${this.baseUrl}3/authentication/guest_session/new?api_key=9c89cd5a5bf43d8b842fd5f040f42645`;
    const res = await fetch(url);
    return res.json();
  };

  getGuestSessionRatedMovies = async (sessionId) => {
    const res = fetch(
      `${this.baseUrl}3/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=ru-RU&sort_by=created_at.asc`
    );
    return (await res).json();
  };

  setRatedMovies = async (moviesId, sessionId, value) => {
    const data = {
      value,
    };
    const res = await fetch(
      `${this.baseUrl}3/movie/${moviesId}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );
    return res;
  };
}
