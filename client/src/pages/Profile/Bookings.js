import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Row, Table, Col, QRCode } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings";
import moment from "moment";

function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
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
      <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
          <Col span={12}>
            <div className="card p-2 flex justify-between uppercase m-1">
              <div>
                
                <h1 className="white text-xl">
                  {booking.show.movie.title} ({booking.show.movie.language})
                </h1>
                <div className="divider"></div>
                <h1 className=" white text-sm">
                  {booking.show.theatre.name} ({booking.show.theatre.address})
                </h1>
                <h1 className="white text-sm">
                  Data si ora: {moment(booking.show.date).format("DD.MM.YYYY")}{" "}
                  - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </h1>

                <h1 className="white text-sm">
                  Pret total: {booking.show.ticketPrice * booking.seats.length} RON
                </h1>
                <h1 className="white text-sm">Numarul rezervarii: {booking._id}</h1>
                <QRCode
                size={100}
                className="mt-2"
                bgColor="white"
                fgColor="black"
                value={booking._id}/>
              </div>

              <div>
                <img
                  src={booking.show.movie.poster}
                  alt=""
                  height={120}
                  width={200}
                  className=""
                />
                <h1 className="white text-sm ml-4">Locuri: {booking.seats.join(", ")}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookings;
