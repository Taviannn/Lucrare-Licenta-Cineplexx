import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";

function TheatresForMovie() {
  // get date from query string
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );

  const [movie, setMovie] = React.useState([]);
  const [theatres, setTheatres] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({ date, movie: params.id });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date]);
  return (
    movie && (
      <div>
        {/* movie information */}
        <div className="flex items-center mb-2">
          <div>
            <h1 className="white text-2xl uppercase">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="white text-md">Durata : {movie.duration} min</h1>
            <h1 className="white text-md">
              Data lansarii : {moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="white text-md">Genul: {movie.genre}</h1>
            <h1 className="white text-md textjust mr-10">Descriere: {movie.description}</h1>
            <img src={movie.poster} width={200} height={100} className="mt-2 items-center" align="middle"/>
          </div>

          <div>
            <h1 className="ml-07 white text-md">Selecteaza data</h1>
            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>

        <hr />

        {/* movie theatres */}
        <div className="mt-1">
          <h1 className="text-xl uppercase white">Cinematografe</h1>
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {theatres.map((theatre) => (
            <div className="card p-2">
              <h1 className="white text-md uppercase">{theatre.name}</h1>
              <h1 className="white text-sm">Adresa : {theatre.address}</h1>

              <div className="divider"></div>

              <div className="flex gap-2">
                {theatre.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <div
                      className="card p-1 cursor-pointer"
                      onClick={() => {
                        navigate(`/book-show/${show._id}`);
                      }}
                    >
                      <h1 className="white text-sm hoverc">
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default TheatresForMovie;
