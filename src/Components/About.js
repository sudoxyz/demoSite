import RouteTransition from "./RouteTransition";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import fm from "front-matter";


const About = () => {
  const [markdown, setMarkdown] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("/pages/About.md")
      .then((res) => res.text())
      .then(async (text) => {
        const { attributes, body } = fm(text);
        setMarkdown(body);
        setQuote(attributes.quote);
      })
  }, []);

  return (
    <div>
      <RouteTransition>
        <div className="content-box">
          <div className="title-box"><h1>About Us</h1></div>
          <ReactMarkdown>{markdown}</ReactMarkdown>
          <div className="quote-box">
            <ReactMarkdown>{quote}</ReactMarkdown>
          </div>
        </div>
      </RouteTransition>
    </div>
  );
};

export default About;
