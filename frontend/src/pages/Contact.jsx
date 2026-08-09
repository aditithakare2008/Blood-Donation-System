function Contact() {
  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center text-danger mb-4">
          Contact Us
        </h2>

        <form>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Your Name"
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Your Email"
          />

          <textarea
            className="form-control mb-3"
            rows="5"
            placeholder="Your Message"
          ></textarea>

          <button className="btn btn-danger w-100">
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}

export default Contact;