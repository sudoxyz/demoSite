import RouteTransition from "./RouteTransition";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const Contact = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/pages/Contact.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div id="contact">
      <RouteTransition>
        <div className="content-box">
          <div className="title-box">
            <h1>Contact</h1>
          </div>
          <ReactMarkdown>{markdown}</ReactMarkdown>
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
