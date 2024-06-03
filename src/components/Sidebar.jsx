import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <Logo />
        <AppNav />
      </div>

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Record-world-travel Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
