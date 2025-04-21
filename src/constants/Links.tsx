import Admin from "../components/page/Admin";
import ActorDetails from "../components/page/details/ActorDetails";
import DetailsPage from "../components/page/details/Details";
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
  {
    link: "/details/:type/:id",
    el: <DetailsPage />,
  },
  {
    link: "/actor/:actorId",
    el: <ActorDetails />,
  },
];
