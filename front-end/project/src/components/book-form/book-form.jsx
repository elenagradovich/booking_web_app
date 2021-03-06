import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { submitBooking, loadConstranedDates } from '../../store/actions';
import { connect } from 'react-redux';
import Calendar from '../calendar/calendar';
import {getDiffDates} from '../../utils/common';


function BookForm ({ setVisibilityBookForm, hotelId, onLoadConstranedDates,
  onSubmitBooking, price }) {
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

  useEffect(() => {
    onLoadConstranedDates(hotelId);
  }, []);

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
      <label style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', border: '1px solid grey', marginBottom: '15px', borderRadius: '10px'}}><b>????????????:</b>
        <input value={guestsAmount} type='number' min={1} onChange={(e) => setGuestsAmount(e.target.value)} />
      </label>
      {<p>???????? ???? ????????????: {taxValue} BYN</p> }
      {<p>?????????? ?????????????????? ???? {periodDays} ??????????: <b>{totalValue} BYN</b></p>}
      <div className="book__button-wrapper">
        <button
          className="book__submit form__submit button"
          type="submit"
          disabled=""
          onClick={submitClickHandler}
        >
          ??????????????????????????
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
  onLoadConstranedDates: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitBooking(hotelId,bookingInfo) {
    dispatch(submitBooking(hotelId, bookingInfo));
  },
  onLoadConstranedDates(id) {
    dispatch(loadConstranedDates(id));
  },
});

export { BookForm };
export default connect(
  null,
  mapDispatchToProps,
)(BookForm);
