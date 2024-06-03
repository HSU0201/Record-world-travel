// 從 react 匯入 createContext, useEffect, useContext, useReducer 和 useCallback 鉤子
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

// 定義基礎 URL
// const BASE_URL = "http://localhost:9000";
const BASE_URL = "https://main--record-world-travel.netlify.app:9000";

// 建立 CitiesContext 以供全域使用
const CitiesContext = createContext();

// 定義初始狀態
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

// 定義 reducer 函數來處理狀態更新
function reducer(state, action) {
  switch (action.type) {
    // 處理 "loading" 動作，設置 isLoading 狀態為 true
    case "loading":
      return { ...state, isLoading: true };

    // 處理 "cities/loaded" 動作，更新 cities 狀態
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    // 處理 "city/loaded" 動作，更新 currentCity 狀態
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    // 處理 "city/created" 動作，新增城市並更新 currentCity 狀態
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    // 處理 "city/deleted" 動作，刪除城市並清空 currentCity 狀態
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    // 處理 "rejected" 動作，設置錯誤訊息
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // 處理未知動作
    default:
      throw new Error("Unknown action type");
  }
}

// 定義 CitiesProvider 組件，提供城市資料上下文
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // 使用 useEffect 鉤子在組件掛載時獲取城市資料
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "載入城市資料時發生錯誤...",
        });
      }
    }
    fetchCities();
  }, []);

  // 使用 useCallback 鉤子定義 getCity 函數，獲取指定城市資料
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "載入城市資料時發生錯誤...",
        });
      }
    },
    [currentCity.id]
  );

  // 定義 createCity 函數，新增城市資料
  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "新增城市資料時發生錯誤...",
      });
    }
  }

  // 定義 deleteCity 函數，刪除指定城市資料
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "刪除城市資料時發生錯誤...",
      });
    }
  }

  // 返回提供的城市資料上下文，包括 cities, isLoading, currentCity, error, getCity, createCity 和 deleteCity
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// 定義 useCities 鉤子，方便在組件中使用城市資料上下文
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

// 匯出 CitiesProvider 和 useCities 以供其他組件使用
export { CitiesProvider, useCities };
