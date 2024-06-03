import { useNavigate, useSearchParams } from "react-router-dom"; // 引入 react-router-dom 內的 useNavigate 和 useSearchParams
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet"; // 引入 react-leaflet 內的 MapContainer, TileLayer, Marker, Popup, useMap 和 useMapEvents

import styles from "./Map.module.css"; // 引入 Map 模組的 CSS 樣式
import { useEffect, useState } from "react"; // 引入 useEffect 和 useState 這兩個 React 的 Hook
import { useCities } from "../contexts/CitiesContext"; // 引入 CitiesContext 內的 useCities Hook
import { useGeolocation } from "../hooks/useGeolocation"; // 引入自定義的 useGeolocation Hook
import { useUrlPosition } from "../hooks/useUrlPosition"; // 引入自定義的 useUrlPosition Hook
import Button from "./Button"; // 引入 Button 組件

function Map() {
  const { cities } = useCities(); // 從 CitiesContext 中獲取城市數據
  const [mapPosition, setMapPosition] = useState([40, 0]); // 設定地圖初始位置為 [40, 0]
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(); // 使用自定義的 useGeolocation Hook 獲取地理位置數據
  const [mapLat, mapLng] = useUrlPosition(); // 使用自定義的 useUrlPosition Hook 獲取 URL 中的經緯度參數

  // 當 URL 中有經緯度參數時，設定地圖位置
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // 當獲取到地理位置時，設定地圖位置
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {/* 如果沒有獲取到地理位置，顯示按鈕讓用戶獲取位置 */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "獲取資料中..." : "找尋你的位置"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* 在地圖上添加城市標記 */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* ==== */}
        {/* {geolocationPosition && (
          <Marker position={[geolocationPosition.lat, geolocationPosition.lng]} icon={myIcon}>
            <Popup>你的位置</Popup>
          </Marker>
        )} */}
        {/* === */}
        <div className="leaflet-bottom leaflet-right">
          <ZoomControl position="bottomright" />
        </div>
        <ChangeCenter position={mapPosition} /> {/* 更新地圖中心 */}
        <DetectClick /> {/* 偵測地圖點擊事件 */}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap(); // 獲取地圖實例
  map.setView(position); // 設定地圖中心
  return null; // 不渲染任何內容
}

function DetectClick() {
  const navigate = useNavigate(); // 獲取導航實例

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), // 當地圖被點擊時，導航到新的路徑並攜帶點擊位置的經緯度參數
  });
}

export default Map; // 將 Map 組件作為預設匯出
