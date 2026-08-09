import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalDonations: 0,
    totalBloodUnits: 0,
  });

  const [requests, setRequests] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login to view dashboard.");
        }

        // ===============================
        // Fetch Dashboard Statistics
        // ===============================

        const statsResponse = await fetch(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const statsData = await statsResponse.json();

        if (!statsResponse.ok) {
          throw new Error(
            statsData.message ||
              statsData.error ||
              "Failed to fetch dashboard"
          );
        }

        setStats(statsData.stats);

        if (statsData.lastUpdated) {
          setLastUpdated(statsData.lastUpdated);
        }

        // ===============================
        // Fetch Blood Requests
        // ===============================

        const requestsResponse = await fetch(
          "http://localhost:5000/api/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const requestsData = await requestsResponse.json();

        if (!requestsResponse.ok) {
          throw new Error(
            requestsData.message ||
              requestsData.error ||
              "Failed to fetch requests"
          );
        }

        setRequests(requestsData.requests || []);

        setLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);

        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading dashboard...</h4>
      </div>
    );
  }

  // ===============================
  // Error
  // ===============================

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          ❌ {error}
        </div>
      </div>
    );
  }

  // ===============================
  // Dashboard
  // ===============================

  return (
    <div className="container mt-5">

      {/* ===============================
          TITLE
      =============================== */}

      <h2 className="text-center text-danger mb-2">
        Blood Donation Dashboard
      </h2>

      {lastUpdated && (
        <p className="text-center text-muted mb-4">
          Last updated:{" "}
          {new Date(lastUpdated).toLocaleString()}
        </p>
      )}

      {/* ===============================
          DONOR STATISTICS
      =============================== */}

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Donors</h5>

            <h2 className="text-danger">
              {stats.totalDonors}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Available Donors</h5>

            <h2 className="text-success">
              {stats.availableDonors}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Requests</h5>

            <h2 className="text-danger">
              {stats.totalRequests}
            </h2>
          </div>
        </div>

        {/* ===============================
            REQUEST STATISTICS
        =============================== */}

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Pending Requests</h5>

            <h2 className="text-warning">
              {stats.pendingRequests}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Completed Requests</h5>

            <h2 className="text-success">
              {stats.completedRequests}
            </h2>
          </div>
        </div>

        {/* ===============================
            DONATION STATISTICS
        =============================== */}

        <div className="col-md-4 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Donations</h5>

            <h2 className="text-primary">
              {stats.totalDonations}
            </h2>
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div className="card shadow text-center p-4">
            <h5>Total Blood Units</h5>

            <h2 className="text-danger">
              {stats.totalBloodUnits}
            </h2>
          </div>
        </div>

      </div>

      {/* ===============================
          BLOOD REQUESTS
      =============================== */}

      <div className="card shadow mt-3 mb-5">

        <div className="card-header bg-danger text-white">
          <h4 className="mb-0">
            🩸 Blood Requests
          </h4>
        </div>

        <div className="card-body">

          {requests.length === 0 ? (
            <p className="text-center text-muted">
              No blood requests found.
            </p>
          ) : (
            <div className="table-responsive">

              <table className="table table-bordered table-hover">

                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Units</th>
                    <th>Hospital</th>
                    <th>Location</th>
                    <th>Urgency</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {requests.map((request) => (
                    <tr key={request._id}>

                      <td>
                        {request.recipientName}
                      </td>

                      <td>
                        <strong className="text-danger">
                          {request.bloodType}
                        </strong>
                      </td>

                      <td>
                        {request.unitsRequired}
                      </td>

                      <td>
                        {request.hospitalName}
                      </td>

                      <td>
                        {request.location}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            request.urgency === "Emergency"
                              ? "bg-danger"
                              : request.urgency === "Urgent"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {request.urgency}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            request.status === "Completed"
                              ? "bg-success"
                              : request.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;