import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          陪你環遊世界。
          <br />
          記錄冒險經歷。
        </h1>
        <h2>
          一張世界地圖，追蹤你的足跡，進入你能想到的每個城市
          的。永遠不要忘記您的美好經歷，並向您的朋友展示如何 你已經遊歷世界了。
        </h2>
        <Link to="/login" className="cta">
          開始記錄
        </Link>
      </section>
    </main>
  );
}
