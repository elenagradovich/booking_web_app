import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/themes/material_green.css';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

function Calendar ({ setDateRange }) {
  const [range, setRange] = useState([]);

  useEffect(() => {
    setDateRange(range);
  }, [range]);


  return (
    <div className="event__field-group  event__field-group--time">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width:'100%',
        marginRight: '1em',
        padding: '5px',
        border: '1px solid grey',
        marginBottom: '15px',
        borderRadius: '10px',
      }}
      >
        <b>прибытие</b>
        <Flatpickr
          style={{ border: 'none'}}
          onChange={(date) => setRange(date)}
          placeholder = {'Выберите дату заезда..'}
          options={{
            plugins: [new rangePlugin({ input: '#secondRangeInput' })],
            minDate: 'today',
            dateFormat: 'Y-m-d',
            locale: Russian,
            disable: [
              // function(date) {
              //     // disable every multiple of 8
              //     return !(date.getDate() % 8);
              // }
            ],
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width:'100%',
        padding: '5px',
        border: '1px solid grey',
        marginBottom: '15px',
        borderRadius: '10px',
      }}
      >
        <b>выезд</b>
        <input
          onChange={(date) => setRange(date)}
          style={{ border: 'none'}}
          placeholder='Выберите дату заезда..'
          type="text"
          id="secondRangeInput"
          data-fp-omit=""
          readOnly='readonly'
        />
      </div>
    </div>
  );
}

Calendar.propTypes = {
  setDateRange: PropTypes.func,
};


export default Calendar;

