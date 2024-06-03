// 從 react 匯入 createContext, useContext 和 useReducer 鉤子
import { createContext, useContext, useEffect, useReducer } from "react";

// 建立 AuthContext 以供全域使用
const AuthContext = createContext();

// 定義初始狀態
const initialState = {
  user: null,
  isAuthenticated: false,
};

// 定義 reducer 函數來處理狀態更新
function reducer(state, action) {
  switch (action.type) {
    // 處理 "login" 動作，設置 user 和 isAuthenticated 狀態
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    // 處理 "logout" 動作，清空 user 和設置 isAuthenticated 為 false
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    // 處理未知動作
    default:
      throw new Error("Unknown action");
  }
}

// 模擬用戶資料
const FAKE_USER = {
  name: "企鵝",
  email: "penguin@example.com",
  password: "penguin",
  avatar: "https://github.com/HSU0201/images/blob/main/blogimage.jpg?raw=true",
};

// 定義 AuthProvider 組件，提供認證上下文
function AuthProvider({ children }) {
  // 使用 useReducer 鉤子來管理認證狀態
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      login(storedEmail, storedPassword);
    }
  }, []);

  // 定義 login 函數，檢查電子郵件和密碼是否匹配 FAKE_USER
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  // 定義 logout 函數，執行 "logout" 動作
  function logout() {
    dispatch({ type: "logout" });
    localStorage.clear();
  }

  // 返回提供的認證上下文，包括 user, isAuthenticated, login 和 logout
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 定義 useAuth 鉤子，方便在組件中使用認證上下文
function useAuth() {
  const context = useContext(AuthContext);
  // 檢查是否在 AuthProvider 外部使用 useAuth 鉤子
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

// 匯出 AuthProvider 和 useAuth 以供其他組件使用
export { AuthProvider, useAuth };
