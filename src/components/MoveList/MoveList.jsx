/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import React, { Component } from 'react';
import MoveListItem from '../MoveListItem';
import { Spin, Alert, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import './MoveList.css';
import PropTypes from 'prop-types';

export default class MoveList extends Component {
  static defaultProps = {
    moveData: [],
    handleAddRatingMovie: () => {},
  };

  createMoveList = () => {
    const { moveData, handleAddRatingMovie } = this.props;
    return moveData.map(
      ({
        poster_path: posterPath,
        release_date: releaseDate,
        id,
        title,
        vote_average: voteAverage,
        overview,
        genre_ids: genreIds,
      }) => {
        return (
          <li className="movies__card" key={id}>
            <MoveListItem
              id={id}
              poster={posterPath}
              release={releaseDate}
              title={title}
              score={voteAverage}
              overview={overview}
              handleAddRatingMovie={handleAddRatingMovie}
              genreIds={genreIds}
            />
          </li>
        );
      }
    );
  };

  handleMoveListRender = () => {
    let result = null;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.keyword) {
      result = <ul className="movies__list">{this.createMoveList()}</ul>;
    } else {
      result = <h2 className="main-title">Введите название фильма</h2>;
    }
    return result;
  };

  handleChangePages = (page) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.changePages(page);
  };

  createPaginations = () => {
    const { totalPages, totalResults, keyword, isLoaded } = this.props;
    if (totalResults > 20 && keyword && !isLoaded) {
      return (
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={totalResults}
          size={totalPages}
          onChange={this.handleChangePages}
        />
      );
    }
  };

  render() {
    const { isError, isLoaded, totalResults, keyword } = this.props;

    const content = isLoaded && keyword ? <Spin size="large" /> : this.handleMoveListRender();

    const nothingFound = !totalResults && keyword && !isLoaded && <Empty />;

    const errAlert = (
      <Alert message="Ошибка :(" description="Не могу получить данные с сервера" type="error" showIcon />
    );

    return (
      <section className="movies">
        {isError ? errAlert : content}
        {!isError && nothingFound}
        {this.createPaginations()}
      </section>
    );
  }
}

MoveList.propTypes = {
  moveData: PropTypes.arrayOf(PropTypes.object),
  handleAddRatingMovie: PropTypes.func,
};
