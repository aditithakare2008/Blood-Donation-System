function Stats() {
  const stats = [
    { title: "Registered Donors", value: "500+", icon: "🩸" },
    { title: "Blood Requests", value: "150+", icon: "🚑" },
    { title: "Lives Saved", value: "350+", icon: "❤️" },
    { title: "Cities Covered", value: "25+", icon: "📍" },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center text-danger mb-4">
        Our Impact
      </h2>

      <div className="row">
        {stats.map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h1>{item.icon}</h1>
                <h3 className="text-danger">{item.value}</h3>
                <p>{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;