function DonorCard({ name, blood, city, phone }) {
  return (
    <div className="card shadow h-100">
      <div className="card-body text-center">
        <img
          src="https://via.placeholder.com/120"
          alt="Donor"
          className="rounded-circle mb-3"
        />

        <h4>{name}</h4>

        <span className="badge bg-danger fs-6">
          {blood}
        </span>

        <p className="mt-3">📍 {city}</p>

        <p>📞 {phone}</p>

        <button className="btn btn-success w-100">
          Contact
        </button>
      </div>
    </div>
  );
}

export default DonorCard;