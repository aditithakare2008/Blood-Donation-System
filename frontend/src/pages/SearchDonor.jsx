import { useState } from "react";
import DonorCard from "../components/DonorCard";

function SearchDonor() {
  const [city, setCity] = useState("");
  const [blood, setBlood] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams();

      if (city.trim() !== "") {
        params.append("city", city.trim());
      }

      if (blood !== "") {
        params.append("bloodType", blood);
      }

      const response = await fetch(
        `http://https://blood-donation-backend-xyth.onrender.com/api/donors?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch donors");
      }

      const data = await response.json();

      // Extra safety: show ONLY available donors
      const availableDonors = data.filter(
        (donor) => donor.isAvailable === true
      );

      setDonors(availableDonors);

    } catch (error) {
      console.error("Search donor error:", error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center text-danger mb-4">
        Search Blood Donors
      </h2>

      <div className="row mb-4">

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={blood}
            onChange={(e) => setBlood(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-danger w-100"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

      </div>

      <div className="row">

        {loading ? (
          <h4 className="text-center">
            Searching donors...
          </h4>

        ) : !searched ? (
          <h5 className="text-center text-muted">
            Enter a city or select a blood group to search.
          </h5>

        ) : donors.length > 0 ? (

          donors.map((donor) => (
            <div
              className="col-md-4 mb-4"
              key={donor._id}
            >
              <DonorCard
                name={donor.name}
                blood={donor.bloodType}
                city={donor.city}
                phone={donor.phone}
              />
            </div>
          ))

        ) : (

          <h4 className="text-center text-danger">
            No available donors found.
          </h4>

        )}

      </div>

    </div>
  );
}

export default SearchDonor;