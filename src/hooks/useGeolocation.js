// 從 react 匯入 useState 鉤子
import { useState } from "react";

// 定義 useGeolocation 函數，這是一個自定義鉤子，帶有預設位置參數
export function useGeolocation(defaultPosition = null) {
  // 定義 isLoading 狀態，用於追蹤是否正在加載位置資訊
  const [isLoading, setIsLoading] = useState(false);
  
  // 定義 position 狀態，用於儲存當前的位置資訊
  const [position, setPosition] = useState(defaultPosition);
  
  // 定義 error 狀態，用於儲存可能出現的錯誤訊息
  const [error, setError] = useState(null);

  // 定義 getPosition 函數，用於獲取當前的位置資訊
  function getPosition() {
    // 檢查瀏覽器是否支援地理位置 API
    if (!navigator.geolocation)
      return setError("您的瀏覽器不支援地理位置服務");

    // 設定 isLoading 狀態為 true，表示正在加載位置資訊
    setIsLoading(true);
    
    // 使用瀏覽器的地理位置 API 獲取當前位置
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // 如果成功獲取位置資訊，更新 position 狀態
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        // 設定 isLoading 狀態為 false，表示加載完成
        setIsLoading(false);
      },
      (error) => {
        // 如果獲取位置資訊失敗，更新 error 狀態並設置 isLoading 狀態為 false
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  // 返回一個物件，包含 isLoading 狀態、position 狀態、error 狀態和 getPosition 函數
  return { isLoading, position, error, getPosition };
}
