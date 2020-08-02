import React, { Component } from 'react';
import MoveList from '../MoveList/MoveList';
import moviesData from '../../moviesData';
import SearchPanel from '../SearchPanel';
import { debounce } from 'lodash';
import './App.css';

export default class App extends Component {
  state = {
    keyword: 'Batman',
    isLoaded: true,
    isError: false,
    pages: 1,
    totalResults: null,
    moveData: [],
  };

  moveApi = new moviesData();

  componentDidMount() {
    this.updateMove(this.state.pages);
  }

  changeKeyword = debounce((value) => {
    this.setState({
      keyword: value,
      isLoaded: true,
    });
  }, 700);

  handleError = (err) => {
    this.setState({
      isError: true,
      isLoaded: false,
    });
  };

  changePages = (page) => {
    this.setState({
      pages: page,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyword, pages } = this.state;
    if (keyword !== prevState.keyword) {
      this.updateMove();
    }
    if (pages !== prevState.pages) {
      this.updateMove(pages);
    }
  }

  updateMove = (pages = 1) => {
    const { keyword } = this.state;
    if (keyword) {
      this.moveApi
        .getMoveByKeyword(keyword, pages)
        .then((data) => {
          console.log(data);
          const { results, total_results, total_pages } = data;

          this.setState({
            moveData: results,
            totalResults: total_results,
            totalPages: total_pages,
            isLoaded: false,
          });
        })
        .catch(this.handleError);
    }
  };

  render() {
    const { keyword, moveData, isLoaded, isError, totalResults } = this.state;
    return (
      <div className='container'>
        <SearchPanel
          changeKeyword={this.changeKeyword}
          keyword={this.state.keyword}
        />
        <section className='movies'>
          <MoveList
            keyword={keyword}
            moveData={moveData}
            isLoaded={isLoaded}
            isError={isError}
            totalResults={totalResults}
            changePages={this.changePages}
          />
        </section>
      </div>
    );
  }
}
