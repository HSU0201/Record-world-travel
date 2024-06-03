// 從 react-router-dom 中匯入 useSearchParams 鉤子
import { useSearchParams } from "react-router-dom";

// 定義 useUrlPosition 函數，這是一個自定義鉤子
export function useUrlPosition() {
  // 使用 useSearchParams 鉤子來獲取當前 URL 的搜尋參數
  const [searchParams] = useSearchParams();
  
  // 獲取名為 "lat" 的搜尋參數，代表緯度
  const lat = searchParams.get("lat");
  
  // 獲取名為 "lng" 的搜尋參數，代表經度
  const lng = searchParams.get("lng");

  // 返回一個陣列，包含緯度和經度
  return [lat, lng];
}
