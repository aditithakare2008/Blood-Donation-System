import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    bloodGroup: "",
    age: "",
    weight: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/donors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            city: formData.city,
            bloodType: formData.bloodGroup,
            age: Number(formData.age),
            weight: Number(formData.weight),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("success");

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          city: "",
          bloodGroup: "",
          age: "",
          weight: "",
        });
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(
        "Cannot connect to backend. Make sure the backend is running."
      );
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "600px" }}
    >
      <div className="card shadow p-4">

        <h2 className="text-center text-danger mb-4">
          Donor Registration
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            className="form-control mb-3"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            className="form-control mb-3"
            placeholder="Age"
            min="18"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="weight"
            className="form-control mb-3"
            placeholder="Weight (kg)"
            min="45"
            value={formData.weight}
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            className="form-select mb-3"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <button
            type="submit"
            className="btn btn-danger w-100"
          >
            Register
          </button>

        </form>

        {message === "success" && (
          <div className="alert alert-success mt-3">
            ✅ Donor registered successfully!
          </div>
        )}

        {message && message !== "success" && (
          <div className="alert alert-danger mt-3">
            ❌ {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default Register;