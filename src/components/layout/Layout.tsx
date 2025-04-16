import { FC, ReactNode } from "react";
import scss from "./Layout.module.scss";
import Footer from "./footer/Footer";
import Header from "./header/Header";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <section className={scss.Layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
