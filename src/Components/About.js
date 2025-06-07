import RouteTransition from "./RouteTransition";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const About = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/About.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div>
      <RouteTransition>
        <div className="content-box">
          <div className="title-box"><h1>About Us</h1></div>
          <ReactMarkdown>{markdown}</ReactMarkdown>
          <div className="quote-box">
            <p>
              "Security is not a product, but a process. Our goal is to empower
              you to operate safely and confidently."
            </p>
            <br />
            <strong>–</strong> <span>Ethan Miller</span>, Founder
          </div>
        </div>
      </RouteTransition>
    </div>
  );
};

export default About;
