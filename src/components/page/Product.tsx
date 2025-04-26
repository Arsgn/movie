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
  backdrop_path: string;
}

const api = "45d1d56fc54beedb6c0207f9ac6cab7c";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Product: FC = () => {
  const [movie, setMovie] = useState<IMovie[]>([]);
  const [filtered, setFiltered] = useState<IMovie[]>([]);
  const [change, setChange] = useState<"movie" | "tv">("movie");
  const [count, setCount] = useState(0);
  const [countEnd, setCountEnd] = useState(12);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);

  const fetchData = async (pageNum: number) => {
    const endpoint = isTopRated
      ? `https://api.themoviedb.org/3/${change}/top_rated?api_key=${api}&language=en-US&page=${pageNum}`
      : `https://api.themoviedb.org/3/${change}/popular?api_key=${api}&language=en-US&page=${pageNum}`;

    const { data } = await axios.get(endpoint);
    setMovie(data.results);
    setFiltered(data.results);
  };

  useEffect(() => {
    if (!query) {
      fetchData(page);
    }
  }, [page, change, isTopRated]);

  const handleNext = () => {
    if (countEnd >= filtered.length) {
      setPage((prev) => prev + 1);
      setCount(0);
      setCountEnd(12);
    } else {
      setCount((prev) => prev + 8);
      setCountEnd((prev) => prev + 12);
    }
  };

  const handleBack = () => {
    if (count === 0 && page > 1) {
      setPage((prev) => prev - 1);
      setCount(8);
      setCountEnd(20);
    } else if (count > 0) {
      setCount((prev) => prev - 8);
      setCountEnd((prev) => prev - 8);
    }
  };

  const handleSwitchChange = (val: string) => {
    setChange(val as "movie" | "tv");
    setPage(1);
    setCount(0);
    setCountEnd(12);
    setQuery("");
  };

  const handleSearch = (val: string) => {
    setQuery(val);
  };

  const filterData = async () => {
    if (!query.trim()) return;

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${change}?api_key=${api}&query=${query}`
      );
      setMovie(data.results);
      setFiltered(data.results);
      setCount(0);
      setCountEnd(12);
    } catch (error) {
      console.error("Ошибка при поиске:", error);
    }
  };

  const handleTopRatedClick = () => {
    setIsTopRated((prev) => !prev);
    setPage(1);
    setCount(0);
    setCountEnd(12);
    setQuery("");
  };

  console.log(filtered);

  return (
    <div>
      <section className={scss.HomePage}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.bot}>
              <div className={scss.top}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className={scss.search}
                />
                <button onClick={filterData}>Search</button>
                <button onClick={handleTopRatedClick}>
                  {isTopRated ? "Show Popular" : "Show Top Rated"}
                </button>
              </div>

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
