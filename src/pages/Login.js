import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  //     POST https://api.escuelajs.co/api/v1/auth/login
  // Content-Type: application/json

  // {
  //   "email": "john@mail.com",
  //   "password": "changeme"
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        throw new Error("Login failed");
      }
      let data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
