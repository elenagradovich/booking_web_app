import React, { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

function Map({ hotel }) {
  const cityLocation = hotel?.cityId.location;
  const hotelLocation = hotel?.location;
  const mapRef = useRef(null);
  const cityCords = {
    lat: cityLocation.latitude,
    lng: cityLocation.longitude,
  };

  const hotelCords = {
    lat: hotelLocation.latitude,
    lng: hotelLocation.longitude,
  };

  const URL_MARKER_CURRENT = '../../img/pin-active.svg';

  const currentIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const map = useMap(mapRef, cityCords);
 
  useEffect(() => {
    if (map) {
      leaflet
        .marker(
          {
            lat: hotelCords.lat,
            lng: hotelCords.lng,
          },
          {
            icon: currentIcon,
          })
        .addTo(map);
    }
  }, [map, hotel]);
  return (
    <div
      id='map'
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}


export default Map;
