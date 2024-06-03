// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            這是一個使用 React 路由建立分頁的練習頁。
            <br />
            透過此練習頁，初步學習如何使用 React Router
            來實現應用程式內的路由導航。此頁面展示了如何在不同的路由間切換，以及如何在頁面中傳遞和接收參數。
            <br />
            通過這個練習，掌握 React Router
            的基本使用方法，並應用到實際的前端開發中。
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
