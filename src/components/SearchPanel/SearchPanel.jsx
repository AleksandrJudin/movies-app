import React, { Component } from 'react';
import './SearchPanel.css';

export default class SearchPanel extends Component {
  render() {
    const { changeKeyword, keyword } = this.props;

    return (
      <div className='search-panel'>
        <input
          className='form-control mr-sm-2'
          type='search'
          placeholder='Search'
          onInput={(e) => changeKeyword(e.target.value)}
          defaultValue={keyword}
        />
      </div>
    );
  }
}
