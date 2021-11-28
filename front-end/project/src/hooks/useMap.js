import { useEffect, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZOOM } from '../constants/map';

function useMap(mapRef, cityCords) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: cityCords,
        zoom: ZOOM,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, []);

  useEffect(() => {
    if (mapRef && map && cityCords) {
      map.setView(cityCords, ZOOM, { animation: true });
    }
  }, [cityCords]);

  return map;
}

export default useMap;
