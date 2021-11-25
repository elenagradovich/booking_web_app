import React from 'react';
import PropTypes from 'prop-types';
import PlaceCardNear from '../place-card-near/place-card-near';


function NearPlaces ({ places }) {

  return (
    <div className="near-places__list places__list">
      {places.map((place) => <PlaceCardNear hotel={place} key={place.id} />)}
    </div>
  );
}

NearPlaces.defaultProps = {
  places: [],
};

NearPlaces.propTypes = {
  places: PropTypes.array,
};

export default NearPlaces;
