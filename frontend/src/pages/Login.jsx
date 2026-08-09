import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://https://blood-donation-backend-xyth.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        setSuccess(false);
        setMessage(data.message || "Invalid email or password.");
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "donor",
        JSON.stringify(data.donor)
      );

      console.log(
        "SAVED DONOR:",
        localStorage.getItem("donor")
      );

      setSuccess(true);
      setMessage("Login successful! 🎉");

      setLoginData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setSuccess(false);
      setMessage(
        "Cannot connect to backend. Make sure the backend is running."
      );
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center text-danger mb-4">
        Login
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-danger w-100"
        >
          Login
        </button>
      </form>

      {message && (
        <div
          className={`alert ${
            success
              ? "alert-success"
              : "alert-danger"
          } mt-4`}
        >
          {success ? "✅ " : "❌ "}
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;