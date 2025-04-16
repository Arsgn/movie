import { FC } from "react";
import scss from "./ReduxProvider.module.scss";

const ReduxProvider: FC = () => {
  return (
    <section className={scss.ReduxProvider}>
      <div className="container">
        <div className={scss.content}>ReduxProvider</div>
      </div>
    </section>
  );
};

export default ReduxProvider;
