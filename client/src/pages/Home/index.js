import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies } from "../../apicalls/movies";
import { useNavigate } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import moment from "moment";
import 'react-slideshow-image/dist/styles.css';


function Home() {
  const [searchText = "", setSearchText] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
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
  return (
     
    <div>
      <input
        type="text"
        className="search-input bg-black text-white search radius50"
        placeholder="Cauta un film..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      

      <Row gutter={[20]} className="mt-2 mb-2">
        {movies
        .filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
        .map((movie) => (
          <Col span={6}>
            <div
              className=" mt-1 card flex flex-col cursor-pointer radius effect"
              onClick={() =>
                navigate(
                  `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
            >
              <img src={movie.poster} alt="" height={200} className="topradius" />

              <div className="flex justify-center p-1 bg-third botradius ">
                <h1 className="text-md uppercase white">{movie.title}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;


