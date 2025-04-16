import { FC } from "react";
import scss from "./Store.module.scss";

const Store: FC = () => {
  return (
    <section className={scss.Store}>
      <div className="container">
        <div className={scss.content}>Store</div>
      </div>
    </section>
  );
};

export default Store;
