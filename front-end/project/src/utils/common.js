import { Cities } from '../constants/map';
import { AuthorizationStatus } from '../constants/authorization-status';

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


