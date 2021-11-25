import React, { useState } from 'react';
import { SortTypes } from '../../constants/sort-types';
import PropTypes from'prop-types';

const getOptions = (activeSortValue, optionClickHandler) => Object.keys(SortTypes).map((key) => (
  <li key={key}
    className={`places__option ${key === activeSortValue ? 'places__option--active': ''}`}
    tabIndex="0"
    data-value={key}
    onClick={() => optionClickHandler(key)}
  >
    {SortTypes[key]}
  </li>));


function Sorting ({ sortType, setSortType }) {
  const [sortingState, setSortingState] = useState(false);

  const optionClickHandler = (type) => setSortType(type);

  return (
    <form className="places__sorting" action="#" method="get" onClick={(e) => {
      e.preventDefault();
      setSortingState(!sortingState);
    }}
    >
      <span className="places__sorting-caption">Сортировать: </span>
      <span className="places__sorting-type" tabIndex="0"> {SortTypes[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortingState ? 'places__options--opened' : ''}`}>
        {getOptions(sortType, optionClickHandler)}
      </ul>
    </form>
  );
}

Sorting.propTypes = {
  sortType: PropTypes.string,
  setSortType: PropTypes.func,
};

export default Sorting;
