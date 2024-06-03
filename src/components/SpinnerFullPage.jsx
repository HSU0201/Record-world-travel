// 從本地文件引入 Spinner 元件
import Spinner from "./Spinner";

// 從本地 CSS 模組文件引入樣式
import styles from "./SpinnerFullPage.module.css";

// 定義 SpinnerFullPage 組件
function SpinnerFullPage() {
  return (
    // 使用從 CSS 模組中引入的 spinnerFullpage 樣式
    <div className={styles.spinnerFullpage}>
      {/* 渲染 Spinner 元件 */}
      <Spinner />
    </div>
  );
}

// 將 SpinnerFullPage 組件導出，以便在其他文件中使用
export default SpinnerFullPage;
