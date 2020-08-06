/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

import { Tabs } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import MoveList from '../MoveList';
import moviesData from '../../moviesData';
import SearchPanel from '../SearchPanel';
import { MoveGenreProvider } from '../MoviesGenresContext';
import './App.css';
import RatedList from '../RatedList';

export default class App extends Component {
  state = {
    keyword: '',
    isLoaded: true,
    isError: false,
    pages: 1,
    totalResults: null,
    sessionId: null,
    genres: [],
    moveData: [],
    ratedData: [],
  };

  // eslint-disable-next-line new-cap
  moveApi = new moviesData();

  componentDidMount() {
    const { pages } = this.state;
    this.getGuestSessionId();
    this.updateMove(pages);
    this.getMoveGenres();
  }

  componentDidUpdate(prevProps, prevState) {
    const { keyword, pages } = this.state;
    if (keyword !== prevState.keyword) {
      this.updateMove();
    }
    if (pages !== prevState.pages) {
      this.updateMove(pages);
    }
  }

  getMoveGenres = () => {
    this.moveApi.getMoveGenre().then(({ genres }) => {
      this.setState({
        genres,
      });
    });
  };

  getGuestSessionId = () => {
    this.moveApi.getGuestSessionId().then((data) => {
      this.setState({
        sessionId: data.guest_session_id,
      });
    });
  };

  handleAddRatingMovie = (moveId, value) => {
    const { sessionId } = this.state;
    this.moveApi.setRatedMovies(moveId, sessionId, value);
    this.getGuestSessionRatedMovies(sessionId);
  };

  changeKeyword = debounce((value) => {
    this.setState({
      keyword: value,
      isLoaded: true,
    });
  }, 800);

  handleError = () => {
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

  updateMove = (pages = 1) => {
    const { keyword } = this.state;
    if (keyword) {
      this.moveApi
        .getMoveByKeyword(keyword, pages)
        .then((data) => {
          const {
            results,
            total_results: totalResults,
            total_pages: totalPages,
          } = data;
          this.setState({
            moveData: results,
            totalResults,
            totalPages,
            isLoaded: false,
          });
        })
        .catch(this.handleError);
    }
  };

  getGuestSessionRatedMovies = debounce((sessionId) => {
    this.moveApi.getGuestSessionRatedMovies(sessionId).then((data) => {
      this.setState({
        ratedData: data.results,
      });
    });
  }, 1000);

  render() {
    const {
      keyword,
      moveData,
      isLoaded,
      isError,
      totalResults,
      ratedData,
      genres,
    } = this.state;
    const { TabPane } = Tabs;
    return (
      <div className='container'>
        <MoveGenreProvider value={genres}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Search' key='1'>
              <SearchPanel
                changeKeyword={this.changeKeyword}
                keyword={keyword}
              />
              <MoveList
                handleAddRatingMovie={this.handleAddRatingMovie}
                keyword={keyword}
                moveData={moveData}
                isLoaded={isLoaded}
                isError={isError}
                totalResults={totalResults}
                changePages={this.changePages}
              />
            </TabPane>
            <TabPane tab='Rated' key='2'>
              <RatedList data={ratedData} />
            </TabPane>
          </Tabs>
        </MoveGenreProvider>
      </div>
    );
  }
}
