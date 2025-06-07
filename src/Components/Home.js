import RouteTransition from "./RouteTransition";
import { useEffect, useState } from "react";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";


const Home = () => {
  const [section1, setSection1] = useState("");
  const [section2, setSection2] = useState("");
  const [section3, setSection3] = useState("");


  useEffect(() => {
    fetch("/pages/Home.md")
      .then((res) => res.text())
      .then(async (text) => {
        const { attributes } = fm(text);
        setSection1(attributes.section1);
        setSection2(attributes.section2);
        setSection3(attributes.section3);
      })
  }, []);

  return (
    <div>
      <RouteTransition>
        <div className="content-box">
          <div className="title-box">
            <h1>Welcome</h1>
          </div>
          <div className="content-box">
            <ReactMarkdown>{section1}</ReactMarkdown>
          </div>
          <div className="content-box">
            <ReactMarkdown>{section2}</ReactMarkdown>
          </div>
          <div className="content-box">
            <ReactMarkdown>{section3}</ReactMarkdown>
          </div>
        </div>
      </RouteTransition>
    </div>
  );
};

export default Home;
