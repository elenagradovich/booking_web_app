import { Cities } from '../constants/map';
import { AuthorizationStatus } from '../constants/authorization-status';
import dayjs from 'dayjs';
import { DateFormat } from '../constants/calendar';

export const getFavoriteHotels = (hotels) => {
  const favoriteHotels = new Map();
  hotels.forEach((hotel) => {
    const hotelName = hotel.city?.name.toUpperCase();
    favoriteHotels.set(
      hotelName,
      [
        ...favoriteHotels.get(hotelName) || [],
        hotel,
      ],
    );
  });
  return favoriteHotels;
};

export const getHotelsOfCity = (hotels, cityKey) => {
  if(cityKey) {
    return hotels.filter((hotel) => hotel.city.name === Cities[cityKey].name);
  }

  return [];
};

export const sortOffers = (offers, sortType) => {
  const SortTypes = {
    HIGH_TO_LOW: ({price: pricePrev}, {price: priceNext}) => (priceNext - pricePrev),
    LOW_TO_HIGH: ({price: pricePrev}, {price: priceNext}) => (pricePrev - priceNext),
    TOP_RATED_FIRST: ({rating: ratingPrev}, {rating: ratingNext}) => (ratingNext - ratingPrev),
  };
  if(sortType in SortTypes) {
    return [...offers].sort(SortTypes[sortType]);
  }

  return offers;
};

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;


//Dates
const MIN_PERIOD_IN_MINUTES = 1;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * 60;

export const getFullEventsPeriod = (eventPoints) => {
  if(eventPoints && eventPoints.length > 0) {
    const pointsLength = eventPoints.length;
    return `${getDateInFormat(eventPoints[0].dateFrom, DateFormat.DATE_TIME)} - ${getDateInFormat(eventPoints[pointsLength - 1].dateTo, DateFormat.DATE_TIME)}`;
  }
};

export const getFullEventPrice = (point) => {
  const { basePrice, offers } = point;
  return offers.map((item) => item.price).reduce(((sum, item) => sum + item), basePrice);
};

export const getDiffDates = (start, end, unitMeasure) => {
  const period = dayjs(end).diff(dayjs(start), unitMeasure);
  return period;
};

export const getFormatTime = (period) => {
  if(period >= MIN_PERIOD_IN_MINUTES && period < MINUTES_IN_HOUR) {
    return `${period}M`;
  }
  if(period >= MINUTES_IN_HOUR && period < MINUTES_IN_DAY) {
    const hours = Math.trunc(period / MINUTES_IN_HOUR);
    const minutes = period - hours * MINUTES_IN_HOUR;
    return `${hours}H ${minutes ? minutes : '00'}M`;
  }
  if(period >= MINUTES_IN_DAY) {
    const days = Math.trunc(period/MINUTES_IN_DAY);
    const hours = Math.trunc((period - days * MINUTES_IN_DAY) / MINUTES_IN_HOUR);
    const minutes = (period - days * MINUTES_IN_DAY - hours * MINUTES_IN_HOUR);
    return `${days}D ${hours ? hours : '00'}H ${minutes ? minutes : '00'}M`;
  }
};

export const getPeriod = (dateFrom, dateTo) => {
  const periodInMinutes = getDiffDates(dateFrom, dateTo, 'minutes');
  return periodInMinutes ? getFormatTime(periodInMinutes) : '';
};

export const getDateInFormat = (date, type) => dayjs(date).format(type);
