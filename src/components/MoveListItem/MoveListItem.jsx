import React, { Component } from 'react';
import './MoveListItem.css';

export default class MoveListItem extends Component {
  abbrOverviews = (str) => {
    if (str.length > 125) {
      return str.substring(0, 124) + '...';
    }
    if (str.length === 0) {
      return 'Информация отсутсвует';
    }
    return str;
  };

  render() {
    const { poster, title, score, overview } = this.props;

    const moveImg = poster
      ? `https://image.tmdb.org/t/p/original${poster}`
      : 'https://st.kp.yandex.net/images/movies/poster_none.png';

    return (
      <React.Fragment>
        <a href='./ds' className='movies__link'>
          <img src={moveImg} alt='' className='movies__image' />
        </a>
        <div className='movies__info'>
          <div className='card__wrapper'>
            <h3 className='movies__title'>{title}</h3>
            <div className='movies__score'>
              <span className='score__count'>{score}</span>
            </div>
          </div>
          <span className='movies__date'>March 5, 2020</span>
          <div className='movies__genre'>
            <ul className='genre__list'>
              <li className='genre__item'> Action </li>
              <li className='genre__item'> Drama </li>
            </ul>
          </div>
          <p className='movies__description'>{this.abbrOverviews(overview)}</p>
        </div>
      </React.Fragment>
    );
  }
}
