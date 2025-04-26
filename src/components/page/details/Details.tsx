import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import scss from "./Details.module.scss";

interface IMovieDetails {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  backdrop_path: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

const DetailsPage = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(data);
        const videos = await axios.get(
          ` https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=ru-RU`
        );
        const trailer = videos.data.results.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Ошибка при загрузке фильма:", error);
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
    <div
      style={{
        background: `url(${IMAGE_BASE_URL}${movie.backdrop_path}) no-repeat center`,
        backgroundSize: "cover",
      }}
      className={scss.DetailsPage}
    >
      <div className={scss.bg}></div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.imageWrapper}>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title || movie.name}
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
            <div className={scss.btn}>
              <button onClick={() => navigate("/product")}>Назад</button>
              <button
                onClick={() => setIsTrailerVisible(!isTrailerVisible)}
                className={scss.toggleTrailerButton}
              >
                {isTrailerVisible ? "Скрыть" : "Трейлер"}
              </button>
            </div>

            {isTrailerVisible && trailerKey && (
              <div className={scss.trailerWrapper}>
                <div className={scss.trailer}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
