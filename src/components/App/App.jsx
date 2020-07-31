import React, { Component } from 'react';
import MoveList from '../MoveList/MoveList';
import moviesData from '../../moviesData';
import './App.css';

export default class App extends Component {
  state = {
    keyword: 'return',
    isLoaded: false,
    moveData: [],
  };

  moveApi = new moviesData();

  componentDidMount() {
    const { keyword } = this.state;
    this.moveApi.getMoveByKeyword(keyword).then((data) => {
      const items = data.results;
      this.setState({
        moveData: items,
        isLoaded: true,
      });
    });
  }

  render() {
    const { keyword, moveData, isLoaded } = this.state;
    return (
      <section className='movies'>
        <div className='container'>
          <MoveList keyword={keyword} moveData={moveData} isLoaded={isLoaded} />
        </div>
      </section>
    );
  }
}
