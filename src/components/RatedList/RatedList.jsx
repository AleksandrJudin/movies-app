import React, { Component } from 'react';
import { Card, Rate } from 'antd';
import './RatedList.css';
import PropTypes from 'prop-types';

export default class RatedList extends Component {
  static defaultProps = {
    data: [],
  };
  abbrOverviews = (str) => {
    if (str.length > 200) {
      return str.substring(0, 200) + '...';
    }
    if (str.length === 0) {
      return 'Информация отсутствует';
    }
    return str;
  };
  createRatedCart = () => {
    const { data } = this.props;
    const { Meta } = Card;

    return data.map(({ poster_path, title, vote_average, overview }, key) => {
      const moveImg = poster_path
        ? `https://image.tmdb.org/t/p/original${poster_path}`
        : 'https://st.kp.yandex.net/images/movies/poster_none.png';
      return (
        <Card
          hoverable
          style={{ width: 280 }}
          cover={<img alt='example' src={moveImg} />}
          key={key}
        >
          <Meta title={title} description={this.abbrOverviews(overview)} />
          <Rate disabled defaultValue={vote_average} count={10} />
        </Card>
      );
    });
  };
  render() {
    const { data } = this.props;
    const ratedList = (
      <div className='rated__list'>{this.createRatedCart()}</div>
    );
    const title = <h1 className='main-title'>Ничего нет... :(</h1>;
    const content = data.length ? ratedList : title;

    return <section className='rated'>{content}</section>;
  }
}

RatedList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
