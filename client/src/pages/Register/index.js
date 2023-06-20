import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card1 p-3 w-400 radius">
        <h1 className="text-xl mb-1">Cineplexx - Inregistrare</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Nume"
            name="name"
            rules={[{ required: true, message: "Te rog sa introduci numele!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Te rog sa introduci adresa de email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Parola"
            name="password"
            rules={[{ required: true, message: "Te rog sa introduci parola!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="Inregistreaza-te" type="submit" />
            <Link to="/login" className="text-primary">
              {" "}
              Ai deja un cont? Conecteaza-te
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
