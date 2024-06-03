import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>歡迎, {user.name}</span>
      <button onClick={handleClick}>登出</button>
    </div>
  );
}

export default User;

/*
挑戰
1) 將 `AuthProvider` 加到 `App.jsx`
2) 在 `Login.jsx` 頁面中，從上下文呼叫 `login()`
3) 在效果中，檢查是否`isAuthenticated === true`。如果是這樣，以程式設計方式導航到“/app”
4) 在`User.js`中，從上下文（`user`物件）讀取並顯示登入的使用者。然後將此元件包含在`AppLayout.js`中
5) 透過呼叫 `logout()` 並導航回 `/` 來處理註銷按鈕
*/
