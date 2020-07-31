import React, { Component } from 'react';
import MoveList from '../MoveList/MoveList';
import moviesData from '../../moviesData';
import './App.css';

export default class App extends Component {
  state = {
    keyword: 'batman',
    isLoaded: true,
    isError: false,
    moveData: [],
  };

  moveApi = new moviesData();

  handleError = (err) => {
    this.setState({
      isError: true,
      isLoaded: false,
    });
  };

  componentDidMount() {
    const { keyword } = this.state;
    this.moveApi
      .getMoveByKeyword(keyword)
      .then((data) => {
        const items = data.results;
        this.setState({
          moveData: items,
          isLoaded: false,
        });
      })
      .catch(this.handleError);
  }

  render() {
    const { keyword, moveData, isLoaded, isError } = this.state;
    return (
      <section className='movies'>
        <div className='container'>
          <MoveList
            keyword={keyword}
            moveData={moveData}
            isLoaded={isLoaded}
            isError={isError}
          />
        </div>
      </section>
    );
  }
}
