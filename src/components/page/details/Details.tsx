import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import scss from "./Details.module.scss";

interface IMovieDetails {
  id: number;
  title: string;
  name?: string; // для TV-шоу
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

const DetailsPage = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    if (id && type) {
      fetchMovie();
    }
  }, [id, type]);

  if (!movie) {
    return (
      <div className={scss.loading}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={scss.DetailsPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.imageWrapper}>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className={scss.info}>
            <h1>{movie.title || movie.name}</h1>
            <p>
              <strong>Дата выхода:</strong>{" "}
              {movie.release_date || movie.first_air_date}
            </p>
            <p>
              <strong>Рейтинг:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Описание:</strong> {movie.overview}
            </p>
            <button onClick={() => navigate("/product")}>back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
