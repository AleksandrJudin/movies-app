import React, { Component } from 'react';
import MoveListItem from '../MoveListItem';
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

  render() {
    return <ul className='movies__list'>{this.createMoveList()}</ul>;
  }
}
