import { useState } from "react";

function Profile() {
  const storedDonor = localStorage.getItem("donor");

  const [donor, setDonor] = useState(
    storedDonor ? JSON.parse(storedDonor) : null
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateAvailability = async () => {
    if (!donor) {
      setMessage(
        "Donor information not found. Please login again."
      );
      return;
    }

    // Get MongoDB ID
    const donorId = donor._id || donor.id;

    if (!donorId) {
      setMessage(
        "Donor ID not found. Please login again."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const newAvailability = !donor.isAvailable;

      const response = await fetch(
        `https://blood-donation-backend-xyth.onrender.com/api/donors/${donorId}/availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAvailable: newAvailability,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update availability."
        );
      }

      // Update donor with MongoDB response
      const updatedDonor = {
        ...data.donor,
        id: data.donor._id,
      };

      setDonor(updatedDonor);

      // Save updated donor in browser
      localStorage.setItem(
        "donor",
        JSON.stringify(updatedDonor)
      );

      setMessage(data.message);
    } catch (error) {
      console.error(
        "Availability update error:",
        error
      );

      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!donor) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please login first.</h4>
      </div>
    );
  }

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-center text-danger mb-4">
        Donor Profile
      </h2>

      <div className="mb-3">
        <strong>Name:</strong>
        <div>{donor.name}</div>
      </div>

      <div className="mb-3">
        <strong>Email:</strong>
        <div>{donor.email}</div>
      </div>

      <div className="mb-3">
        <strong>Phone:</strong>
        <div>{donor.phone}</div>
      </div>

      <div className="mb-3">
        <strong>City:</strong>
        <div>{donor.city}</div>
      </div>

      <div className="mb-3">
        <strong>Blood Group:</strong>
        <div>{donor.bloodType}</div>
      </div>

      <div className="mb-3">
        <strong>Age:</strong>
        <div>{donor.age}</div>
      </div>

      <div className="mb-4">
        <strong>Availability:</strong>

        <div className="mt-2">
          {donor.isAvailable ? (
            <span className="badge bg-success fs-6">
              🟢 Available for Donation
            </span>
          ) : (
            <span className="badge bg-danger fs-6">
              🔴 Not Available
            </span>
          )}
        </div>
      </div>

      <button
        onClick={updateAvailability}
        disabled={loading}
        className={`btn ${
          donor.isAvailable
            ? "btn-danger"
            : "btn-success"
        } w-100`}
      >
        {loading
          ? "Updating..."
          : donor.isAvailable
          ? "Mark as Not Available"
          : "Mark as Available"}
      </button>

      {message && (
        <div className="alert alert-info mt-4">
          {message}
        </div>
      )}
    </div>
  );
}

export default Profile;