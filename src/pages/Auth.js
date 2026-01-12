import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import loginStyles from "./loginStyles";
import { ToastContainer, toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  //   https://fakeapi.platzi.com/en/rest/auth-jwt/
  //   {
  //   "email": "john@mail.com",
  //   "password": "changeme"
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "https://api.escuelajs.co/api/v1/auth/login"
        : "https://api.escuelajs.co/api/v1/users/";

      const body = isLogin
        ? {
            email: formData.username,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.username,
            password: formData.password,
            avatar: "https://api.escuelajs.co/api/v1/users/avatar",
          };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(
          isLogin ? "Invalid credentials" : "Registration failed"
        );
      }

      const data = await res.json();

      if (isLogin) {
        localStorage.setItem("token", data.access_token);
        toast.success("Login successful 🎉");

        const profileRes = await fetch(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );

        const profileData = await profileRes.json();
        localStorage.setItem("role", profileData.role || "customer");

        setTimeout(() => {
          if (profileData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 1200);
      }
      // ✅ REGISTER FLOW
      else {
        toast.success("Account created successfully ✅ Please login");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong ❌");
    }
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit}>
          <h2 style={loginStyles.heading}>{isLogin ? "Login" : "Register"}</h2>

          {!isLogin && (
            <input
              style={loginStyles.input}
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            style={loginStyles.input}
            type="email"
            placeholder="Email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            style={loginStyles.input}
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button style={loginStyles.button} type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Auth;
