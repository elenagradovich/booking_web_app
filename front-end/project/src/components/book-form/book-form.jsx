import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { submitBooking } from '../../store/actions';
import { connect } from 'react-redux';
import Calendar from '../calendar/calendar';
import {getDiffDates} from '../../utils/common';


function BookForm ({ setVisibilityBookForm, hotelId, onSubmitBooking, price }) {
  const [guestsAmount, setGuestsAmount] = useState(1);
  const [dateRange, setDateRange] = useState([]);

  const [periodDays, setPeriod] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const submitClickHandler = (e) => {
    e.preventDefault();
    if(dateRange && price && dateRange.length === 2) {
      const bookingInfo = {
        dateFrom: dateRange[0],
        dateTo: dateRange[1],
        guestsAmount,
        total: totalValue,
      };
      onSubmitBooking(hotelId, bookingInfo);
    }
    setVisibilityBookForm(false);
  };


  useEffect(() => {
    if(dateRange && dateRange?.length === 2) {
      const period = getDiffDates(dateRange[0], dateRange[1], 'hour') / 24;
      setPeriod(period);
    }

    if(dateRange?.length < 2) {
      const period = getDiffDates(dateRange[0], dateRange[0], 'hour') / 24;
      setPeriod(period);
    }
  }, [dateRange, setPeriod]);

  useEffect(() => {
    if(periodDays >= 0) {
      setTaxValue(Math.round(price * periodDays * 0.05));
      setTotalValue(Math.round(price * periodDays * 1.05));
    }
  }, [periodDays]);

  return (
    <form
      style={
        {
          display: 'inline-block',
          color: '#000',
          border: '2px double #005a7e',
          padding: '30px',
          borderRadius: '15px',
          transition: 'background .3s,color .3s,text-shadow .3s',
          marginBottom: '30px',
        }
      }
      className="book__form form" action="#" method="post"
    >
      <Calendar setDateRange={setDateRange}/>
      <label style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', border: '1px solid grey', marginBottom: '15px', borderRadius: '10px'}}><b>гостей:</b>
        <input value={guestsAmount} type='number' min={1} onChange={(e) => setGuestsAmount(e.target.value)} />
      </label>
      {<p>Сбор за услуги: {taxValue} BYN</p> }
      {<p>Общая стоимость за {periodDays} ночей: <b>{totalValue} BYN</b></p>}
      <div className="book__button-wrapper">
        <button
          className="book__submit form__submit button"
          type="submit"
          disabled=""
          onClick={submitClickHandler}
        >
          ЗАБРОНИРОВАТЬ
        </button>
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmitBooking: PropTypes.func,
  price: PropTypes.number,
  setVisibilityBookForm: PropTypes.func,
  hotelId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitBooking(hotelId,bookingInfo) {
    dispatch(submitBooking(hotelId, bookingInfo));
  },
});

export { BookForm };
export default connect(
  null,
  mapDispatchToProps,
)(BookForm);
