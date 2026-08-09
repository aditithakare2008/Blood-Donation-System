import Stats from "../components/Stats";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-danger text-white text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold">
            Blood Donation Management System
          </h1>

          <p className="lead mt-3">
            Every Drop Counts. Every Donor Saves a Life.
          </p>

          <button className="btn btn-light btn-lg mt-3">
            Become a Donor
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="container mt-5">

        <h2 className="text-center text-danger mb-4">
          Our Services
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <h1>🩸</h1>
                <h4>Donate Blood</h4>
                <p>
                  Register as a donor and help save lives.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <h1>🔍</h1>
                <h4>Find Donor</h4>
                <p>
                  Search donors based on blood group and city.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <h1>🚑</h1>
                <h4>Emergency Request</h4>
                <p>
                  Quickly request blood during emergencies.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Blood Groups */}
      <div className="container mt-5">
        <h2 className="text-center text-danger mb-4">
          Available Blood Groups
        </h2>

        <div className="row text-center">

          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <div className="col-6 col-md-3 mb-3" key={group}>
              <div className="card border-danger shadow">
                <div className="card-body">
                  <h3 className="text-danger">{group}</h3>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-dark text-white text-center py-4 mt-5">
        <h5>Donate Blood, Save Lives ❤️</h5>
      </div>

    </div>
  );
}

export default Home;