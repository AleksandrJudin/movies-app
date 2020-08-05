import React, { Component } from 'react';
import { Rate } from 'antd';
import './MoveListItem.css';
import { MoveGenreConsumer } from '../MoviesGenresContext';
import PropTypes from 'prop-types';

export default class MoveListItem extends Component {
  static defaultProps = {
    setCorrectDate: () => {},
    getRatingBorderColor: () => {},
    abbrOverviews: () => {},
    getGenresById: () => {},
    createGenresList: () => {},
    handleAddRatingMovie: () => {},
    poster: '',
    title: '',
    score: 0,
    overview: '',
    id: 0,
    release: '',
    genreIds: [],
  };
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

  getRatingBorderColor = (score) => {
    if (score <= 3) {
      return '#E90000';
    }
    if (score > 3 && score <= 5) {
      return '#E97E00';
    }
    if (score > 5 && score <= 7) {
      return '#E9D100';
    }
    return '#66E900';
  };

  abbrOverviews = (str) => {
    if (str.length > 100) {
      return str.substring(0, 99) + '...';
    }
    if (str.length === 0) {
      return 'Информация отсутствует';
    }
    return str;
  };

  getGenresById = (genres, ids) => {
    let newArr = [];
    for (let i = 0; i < genres.length; i++) {
      for (let j = 0; j < ids.length; j++) {
        if (ids[j] === genres[i].id) {
          newArr.push(genres[i].name);
        }
      }
    }
    return newArr;
  };

  createGenresList = (genres, ids) => {
    const list = this.getGenresById(genres, ids);
    return list.map((elem, i) => (
      <li key={i} className='genre__item'>
        {elem}
      </li>
    ));
  };

  render() {
    const {
      poster,
      title,
      score,
      overview,
      handleAddRatingMovie,
      id,
      release,
      genreIds,
    } = this.props;

    const moveImg = poster
      ? `https://image.tmdb.org/t/p/original${poster}`
      : 'https://st.kp.yandex.net/images/movies/poster_none.png';

    const ratingBorderColor = {
      borderColor: this.getRatingBorderColor(score),
    };

    return (
      <MoveGenreConsumer>
        {(genre) => {
          return (
            <React.Fragment>
              <a href='./' className='movies__link'>
                <img src={moveImg} alt='' className='movies__image' />
              </a>

              <div className='movies__info'>
                <div>
                  <div className='card__wrapper'>
                    <h3 className='movies__title'>{title}</h3>
                    <div style={ratingBorderColor} className='movies__score'>
                      <span className='score__count'>{score}</span>
                    </div>
                  </div>
                  <span className='movies__date'>
                    {this.setCorrectDate(release)}
                  </span>
                  <div className='movies__genre'>
                    <ul className='genre__list'>
                      {this.createGenresList(genre, genreIds)}
                    </ul>
                  </div>
                  <p className='movies__description'>
                    {this.abbrOverviews(overview)}
                  </p>
                </div>
                <Rate
                  idMovies={id}
                  count={10}
                  allowHalf
                  onChange={(value) =>
                    handleAddRatingMovie(this.props.id, value)
                  }
                />
              </div>
            </React.Fragment>
          );
        }}
      </MoveGenreConsumer>
    );
  }
}

MoveListItem.propTypes = {
  setCorrectDate: PropTypes.func,
  getRatingBorderColor: PropTypes.func,
  abbrOverviews: PropTypes.func,
  getGenresById: PropTypes.func,
  createGenresList: PropTypes.func,
  handleAddRatingMovie: PropTypes.func,
  poster: PropTypes.string,
  title: PropTypes.string,
  score: PropTypes.number,
  overview: PropTypes.string,
  id: PropTypes.number,
  release: PropTypes.string,
  genreIds: PropTypes.arrayOf(PropTypes.number),
};
