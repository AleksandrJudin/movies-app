import React, { Component } from 'react';
import { Rate } from 'antd';
import './MoveListItem.css';

export default class MoveListItem extends Component {
  setCorrectDate = (date) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDate();
    const mounth = new Date(date).getMonth();
    return `${monthNames[mounth]} ${day}, ${year}`;
  };

  abbrOverviews = (str) => {
    if (str.length > 100) {
      return str.substring(0, 99) + '...';
    }
    if (str.length === 0) {
      return 'Информация отсутсвует';
    }
    return str;
  };

  render() {
    const {
      poster,
      title,
      score,
      overview,
      handleAddRatingMovie,
      id,
      tab,
      release,
    } = this.props;

    const moveImg = poster
      ? `https://image.tmdb.org/t/p/original${poster}`
      : 'https://st.kp.yandex.net/images/movies/poster_none.png';

    return (
      <React.Fragment>
        <a href='./ds' className='movies__link'>
          <img src={moveImg} alt='' className='movies__image' />
        </a>

        <div className='movies__info'>
          <div>
            <div className='card__wrapper'>
              <h3 className='movies__title'>{title}</h3>
              <div className='movies__score'>
                <span className='score__count'>{score}</span>
              </div>
            </div>
            <span className='movies__date'>{this.setCorrectDate(release)}</span>
            <div className='movies__genre'>
              <ul className='genre__list'>
                <li className='genre__item'> Action </li>
                <li className='genre__item'> Drama </li>
              </ul>
            </div>
            <p className='movies__description'>
              {this.abbrOverviews(overview)}
            </p>
          </div>
          {tab && (
            <Rate
              idMovies={id}
              count={8}
              allowHalf
              onChange={(value) => handleAddRatingMovie(this.props.id, value)}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}
