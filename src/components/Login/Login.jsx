import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
      notification.error({  message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({  message: "Success", description: message });
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
