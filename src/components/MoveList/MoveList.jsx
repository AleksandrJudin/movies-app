import React, { Component } from 'react';
import MoveListItem from '../MoveListItem';
import { Spin, Alert, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import './MoveList.css';

export default class MoveList extends Component {
  createMoveList = () => {
    const { moveData } = this.props;
    console.log(moveData);
    return moveData.map((moveData) => {
      const {
        poster_path,
        release_date,
        id,
        title,
        vote_average,
        overview,
      } = moveData;
      return (
        <li className='movies__card' key={id}>
          <MoveListItem
            poster={poster_path}
            release={release_date}
            title={title}
            score={vote_average}
            overview={overview}
          />
        </li>
      );
    });
  };

  handleMoveListRender = () => {
    const { keyword } = this.props;
    let result = null;
    if (keyword) {
      result = <ul className='movies__list'>{this.createMoveList()}</ul>;
    } else {
      result = <h1>Введите название фильма, блеать!</h1>;
    }
    return result;
  };

  handleChangePages = (n) => {
    this.props.changePages(n);
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

    const content =
      isLoaded && keyword ? <Spin size='large' /> : this.handleMoveListRender();

    const nothingFound = !totalResults && keyword && !isLoaded && <Empty />;

    const errAlert = (
      <Alert
        message='Ошибка :('
        description='Не могу получить данные с сервера'
        type='error'
        showIcon
      />
    );

    return (
      <React.Fragment>
        {isError ? errAlert : content}
        {!isError && nothingFound}
        {this.createPaginations()}
      </React.Fragment>
    );
  }
}
