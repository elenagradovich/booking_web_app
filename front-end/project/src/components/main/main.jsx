import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Hotels from '../hotels/hotels';
import Header from '../header/header';
import Sorting from '../sorting/sorting';
import { showErrorMessage, loadHotels } from '../../store/actions';
import { connect } from 'react-redux';

function Main({ hotels, errorMessage, onShowErrorMessage, onLoadHotels }) {
  const [hotelsCount, setHotelsCount] = useState(null);
  const [sortType, setSortType] = useState('POPULAR');

  useEffect(() => {
    setTimeout(() => {
      onShowErrorMessage(null);
    }, 5000);
  }, [errorMessage, onShowErrorMessage]);

  useEffect(() => {
    if(!hotels || hotels?.length === 0) {
      onLoadHotels();
    }
  }, []);

  useEffect(() => {
    hotels && setHotelsCount(hotels.length);
  }, [hotels]);

  return (
    <Fragment>
      <Header />
      {errorMessage && <p style={{color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          {/* <section className="locations container">
            <CitiesList />
          </section> */}
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found" style={{
                width: '280px',
                padding: '15px 20px',
                fontSize: '20px',
                lineHeight: '1.1667',
                fontWeight: '700',
                color: '#fff',
                backgroundColor: '#005a7e',
                transform: 'skew(-10deg)',
                borderRadius: '3px'}}
              >
                {hotelsCount ? `${hotelsCount} 
                  ${hotelsCount === 1 ? 'предложение' : 'предложений'}`
                  : 'Предложений не найдено'}
              </b>
              <Sorting sortType={sortType} setSortType={setSortType} />
              <Hotels sortType={sortType} />
            </section>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  hotels: state.DATA.hotels,
  errorMessage: state.DATA.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onShowErrorMessage(err) {
    dispatch(showErrorMessage(err));
  },
  onLoadHotels() {
    dispatch(loadHotels());
  },
});

Main.propTypes = {
  hotels: PropTypes.array,
  errorMessage: PropTypes.string,
  onShowErrorMessage: PropTypes.func,
  onLoadHotels: PropTypes.func,
};

export { Main };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
