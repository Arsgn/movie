import Admin from "../components/page/Admin";
import Home from "../components/page/Home";
import Product from "../components/page/Product";

export const links = [
  {
    link: "/",
    title: "home",
    el: <Home />,
  },
  {
    link: "/product",
    title: "product",
    el: <Product />,
  },
  {
    link: "/admin",
    title: "admin",
    el: <Admin />,
  },
];
