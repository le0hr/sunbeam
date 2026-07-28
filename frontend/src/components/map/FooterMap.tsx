import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

import styles from "./map.module.css";

const POSITION = {
  lat: 49.444433,
  lng: 32.059767,
};

export function FooterMap() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className={styles.wrapper}>
        <Map
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          defaultCenter={POSITION}
          defaultZoom={16}
          gestureHandling="greedy"
          disableDefaultUI
          clickableIcons={false}
          className={styles.map}
        >
          <AdvancedMarker position={POSITION}>
            <div className={styles.marker}>
              ☀
            </div>
          </AdvancedMarker>
        </Map>

        <div className={styles.info}>
          <h3>SunBeam</h3>

          <p>
            Черкаси
          </p>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=49.444433,32.059767"
            target="_blank"
            rel="noreferrer"
          >
            Прокласти маршрут →
          </a>
        </div>
      </div>
    </APIProvider>
  );
}