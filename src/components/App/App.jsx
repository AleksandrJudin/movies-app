import React, { Component } from 'react';
import MoveList from '../MoveList/MoveList';
import moviesData from '../../moviesData';
import SearchPanel from '../SearchPanel';
import { Tabs } from 'antd';
import { debounce } from 'lodash';
import './App.css';

export default class App extends Component {
  state = {
    keyword: '',
    isLoaded: true,
    isError: false,
    pages: 1,
    totalResults: null,
    sessionId: null,
    moveData: [],
    ratedData: [],
  };

  moveApi = new moviesData();

  componentDidMount() {
    this.getGuestSessionId();
    this.updateMove(this.state.pages);
  }

  componentDidUpdate(prevProps, prevState) {
    const { keyword, pages, ratedData } = this.state;
    if (keyword !== prevState.keyword) {
      this.updateMove();
    }
    if (pages !== prevState.pages) {
      this.updateMove(pages);
    }
  }

  getGuestSessionId = () => {
    this.moveApi.getGuestSessionId().then((data) => {
      this.setState({
        sessionId: data.guest_session_id,
      });
    });
  };

  handleAddRatingMovie = (moveId, value) => {
    this.moveApi.setRatedMovies(moveId, this.state.sessionId, value);
    this.getGuestSessionRatedMovies(this.state.sessionId);
  };

  changeKeyword = debounce((value) => {
    this.setState({
      keyword: value,
      isLoaded: true,
    });
  }, 800);

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

  updateMove = (pages = 1) => {
    const { keyword } = this.state;
    if (keyword) {
      this.moveApi
        .getMoveByKeyword(keyword, pages)
        .then((data) => {
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
    } = this.state;
    const { TabPane } = Tabs;
    return (
      <div className='container'>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Search' key='1'>
            <SearchPanel
              changeKeyword={this.changeKeyword}
              keyword={this.state.keyword}
            />
            <MoveList
              handleAddRatingMovie={this.handleAddRatingMovie}
              keyword={keyword}
              moveData={moveData}
              isLoaded={isLoaded}
              isError={isError}
              totalResults={totalResults}
              changePages={this.changePages}
              tab='search'
            />
          </TabPane>
          <TabPane tab='Rated' key='2'>
            <MoveList
              handleAddRatingMovie={this.handleAddRatingMovie}
              keyword={keyword}
              moveData={ratedData}
              isLoaded={isLoaded}
              isError={isError}
              totalResults={totalResults}
              changePages={this.changePages}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
