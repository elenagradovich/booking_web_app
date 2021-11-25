import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import { connect } from 'react-redux';
import { sortOffers } from '../../utils/common';

function Hotels ({ hotels, sortType }) {
  const [sortedHotels, setSortedHotels] = useState([]);

  useEffect(() => {
    setSortedHotels(sortOffers(hotels, sortType));
  }, [hotels, sortType]);

  return(
    <div className="cities__places-list places__list tabs__content">
      {sortedHotels.map((item) => <PlaceCard hotel={item} key={item.id} />)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  hotels: state.DATA.hotels,
});

Hotels.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      type: PropTypes.string,
      rating: PropTypes.number,
      isPremium: PropTypes.bool,
      isFavorite: PropTypes.bool,
      price: PropTypes.number,
      previewImage: PropTypes.string,
    }),
  ),
  sortType: PropTypes.string,
};

export { Hotels };
export default connect(
  mapStateToProps,
  null,
)(Hotels);
