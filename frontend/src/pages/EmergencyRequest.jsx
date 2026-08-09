import { useState } from "react";

function EmergencyRequest() {
  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    location: "",
    bloodType: "",
    unitsRequired: 1,
    contactNumber: "",
    urgency: "Emergency",
    requiredDate: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
      const token = localStorage.getItem("token");

      if (!token) {
        setSuccess(false);
        setMessage(
          "Please login before submitting a blood request."
        );
        return;
      }

      const response = await fetch(
        "https://blood-donation-backend-xyth.onrender.com/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            unitsRequired: Number(formData.unitsRequired),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to submit request."
        );
      }

      setSuccess(true);
      setMessage(
        "Emergency blood request submitted successfully! 🩸"
      );

      setFormData({
        recipientName: "",
        hospitalName: "",
        location: "",
        bloodType: "",
        unitsRequired: 1,
        contactNumber: "",
        urgency: "Emergency",
        requiredDate: "",
      });
    } catch (error) {
      console.error("REQUEST ERROR:", error);
      setSuccess(false);
      setMessage(error.message);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "700px" }}
    >
      <h2 className="text-center text-danger mb-4">
        Emergency Blood Request
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipientName"
          className="form-control mb-3"
          placeholder="Patient Name"
          value={formData.recipientName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="hospitalName"
          className="form-control mb-3"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          className="form-control mb-3"
          placeholder="City / Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <select
          name="bloodType"
          className="form-select mb-3"
          value={formData.bloodType}
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

        <input
          type="number"
          name="unitsRequired"
          className="form-control mb-3"
          placeholder="Units Required"
          min="1"
          value={formData.unitsRequired}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactNumber"
          className="form-control mb-3"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <select
          name="urgency"
          className="form-select mb-3"
          value={formData.urgency}
          onChange={handleChange}
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Emergency">Emergency</option>
        </select>

        <label className="form-label">
          Required Date
        </label>

        <input
          type="date"
          name="requiredDate"
          className="form-control mb-3"
          value={formData.requiredDate}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-danger w-100"
        >
          Submit Blood Request
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

export default EmergencyRequest;