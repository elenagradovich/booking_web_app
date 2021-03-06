export const MAIN = '/';
export const LOGIN = '/login';
export const REGISTRATION = '/signup';
export const ORDERS = '/orders';
export const HOTELS = '/hotels';
export const NOT_FOUND = '/404';
export const OFFER ='/offer/:id';
export const getOfferLink = (id) => OFFER.replace(':id', id);

//API
export const HOTEL = '/hotels/:id';
export const getHotelLink = (id) => HOTEL.replace(':id', id);
export const NEARBY_HOTELS = '/hotels/:hotel_id/nearby';
export const getNearbyHotelsLink = (id) => NEARBY_HOTELS.replace(':hotel_id', id);

export const COMMENTS = 'comments/:hotel_id';
export const getHotelCommentsLink = (id) => COMMENTS.replace(':hotel_id', id);
export const LOGOUT_API = '/user/logout';
export const LOGIN_API = '/user/login';
export const REGISTRATION_API = '/user/signup';
export const ORDERS_API = '/orders';
export const CANCEL_BOOKED_HOTELS = '/orders/:order_id';
export const BOOKED_HOTELS = 'orders/:hotel_id';
export const getHotelCancelBookLink = (id) => BOOKED_HOTELS.replace(':hotel_id', id);
export const getHotelBookLink = (id) => BOOKED_HOTELS.replace(':hotel_id', id);
export const CONSTRANED_DATES_API = 'orders/constraned_dates/:hotel_id';
export const getConstranedLink = (id) => CONSTRANED_DATES_API.replace(':hotel_id', id);

