import axios from "axios";
import { FC, useEffect, useState } from "react";
import scss from "./Product.module.scss";
import SwitchExs from "./exp/Switch";
import { Link } from "react-router-dom";

interface IMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  name: string;
}

const api = "45d1d56fc54beedb6c0207f9ac6cab7c";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Product: FC = () => {
  const [movie, setMovie] = useState<IMovie[]>([]);
  const [filtered, setFiltered] = useState<IMovie[]>([]);
  const [change, setChange] = useState<"movie" | "tv">("movie");
  const [count, setCount] = useState(0);
  const [countEnd, setCountEnd] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchData = async (pageNum: number) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${change}/popular?api_key=${api}&language=en-US&page=${pageNum}`
    );
    setMovie(data.results);
    setFiltered(data.results);
  };

  useEffect(() => {
    fetchData(page);
  }, [page, change, Link]);

  const handleNext = () => {
    if (countEnd >= filtered.length) {
      setPage((prev) => prev + 1);
      setCount(0);
      setCountEnd(10);
    } else {
      setCount((prev) => prev + 10);
      setCountEnd((prev) => prev + 10);
    }
  };

  const handleBack = () => {
    if (count === 0 && page > 1) {
      setPage((prev) => prev - 1);
      setCount(10);
      setCountEnd(20);
    } else if (count > 0) {
      setCount((prev) => prev - 10);
      setCountEnd((prev) => prev - 10);
    }
  };

  const handleSwitchChange = (val: string) => {
    setChange(val as "movie" | "tv");
    setPage(1);
    setCount(0);
    setCountEnd(10);
  };

  return (
    <div>
      <section className={scss.HomePage}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.bot}>
              <input
                type="text"
                placeholder="Search..."
                className={scss.search}
              />
              <SwitchExs
                first="movie"
                second="tv"
                onChange={handleSwitchChange}
              />
            </div>

            <div className={scss.scrollRow}>
              {filtered.slice(count, countEnd).map((item) => (
                <div key={item.id} className={scss.box}>
                  <Link to={`/details/${change}/${item.id}`}>
                    <img
                      src={`${IMAGE_BASE_URL}${item.poster_path}`}
                      alt={item.title || item.name}
                    />
                  </Link>
                  <h4>{change === "movie" ? item.title : item.name}</h4>
                </div>
              ))}
            </div>
            <div className={scss.buttons}>
              <button onClick={handleBack} disabled={page === 1 && count === 0}>
                back
              </button>
              <button onClick={handleNext}>next</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
