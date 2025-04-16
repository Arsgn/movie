import { FC } from "react";
import scss from "./Admin.module.scss";

const Admin: FC = () => {
  return (
    <section className={scss.Admin}>
      <div className="container">
        <div className={scss.content}>Admin</div>
      </div>
    </section>
  );
};

export default Admin;
