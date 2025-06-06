import RouteTransition from "./RouteTransition";


const Contact = () => {
  return (
    <div id="contact">

      <RouteTransition>
        <div className="content-box">
          <div className="title-box">
            <h1>Contact</h1>
          </div>
          <p>
            Have questions or need support? Reach out to our team and we’ll get
            back to you as soon as possible.
          </p>
          <p>
            Contact us at{" "}
            <a href="mailto:info@sudo404.xyz" style={{ color: "#00eeff" }}>
              info@sudo404.xyz
            </a>{" "}
            or use the form below.
          </p>
        </div>
        <div className="contact-form-section">
          <div className="title-box">
            <h1>Email Us for a Quote</h1>
          </div>
          <form
            className="contact-form"
            action="mailto:info@sudo404.xyz"
            method="POST"
            encType="text/plain"
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Tell us about your needs..."
              required
            />
            <button type="submit">Email Us</button>
          </form>
        </div>
      </RouteTransition>
    </div>
  );
};

export default Contact;
