import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import scss from "./ActorDetails.module.scss";

interface IMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type: string;
}

interface IActor {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "45d1d56fc54beedb6c0207f9ac6cab7c";

const ActorDetails = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const [actor, setActor] = useState<IActor | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
        );
        setActor(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных актёра:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=en-US`
        );
        setMovies(data.cast);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов актёра:", error);
      }
    };

    if (actorId) {
      fetchActor();
      fetchMovies();
    }
  }, [actorId]);

  if (!actor) {
    return <div className={scss.loading}>Загрузка...</div>;
  }

  return (
    <div className={scss.ActorDetails}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={scss.backBtn}>
          Назад
        </button>
        <div className={scss.profile}>
          <img
            src={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
          />
          <div className={scss.info}>
            <h1>{actor.name}</h1>
            <p>
              <strong>Дата рождения:</strong> {actor.birthday}
            </p>
            <p>
              <strong>Место рождения:</strong> {actor.place_of_birth}
            </p>
            <p>
              <strong>Биография:</strong>{" "}
              {actor.biography || "Информация недоступна"}
            </p>
          </div>
        </div>

        <h2>Фильмы и сериалы:</h2>
        <div className={scss.moviesGrid}>
          {movies.map((item) => (
            <div
              key={item.id}
              className={scss.movieCard}
              onClick={() => navigate(`/details/${item.id}/${item.media_type}`)}
            >
              <img
                src={
                  item.poster_path
                    ? `${IMAGE_BASE_URL}${item.poster_path}`
                    : "https://via.placeholder.com/150x220?text=No+Image"
                }
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
