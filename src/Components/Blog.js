import { useNavigate } from "react-router-dom";
import RouteTransition from "./RouteTransition";
import { useEffect, useState } from "react";
import fm from "front-matter";
import ReactMarkdown from "react-markdown";


const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    fetch("/blogs.json")
      .then(res => res.json())
      .then(async data => {
        setBlogs(data);
        const descs = {};
        await Promise.all(
          data.map(async blog => {
            const res = await fetch(blog.mdFile);
            const text = await res.text();
            const { attributes } = fm(text);
            descs[blog.id] = attributes.description;
          })
        );
        setDescriptions(descs);
      });
  }, []);

  return (
    <div>
      <RouteTransition>
        <div className="blog-box ">
          <div className="title-box">
            <h1 className="centered-text" style={{fontSize:"1.5rem"}}>Blogs</h1>
          </div>
          <div className="blog-button-container">
            {blogs.map(blog => (
              <div
                key={blog.id}
                id={blog.id}
                className="blog-button"
                onClick={() => navigate(`/blog/${blog.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="title-box">
                  <h1 className="centered-text">{blog.title}</h1>
                </div>
                <p>
                  {descriptions[blog.id] || "Loading..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RouteTransition>
    </div>
  );
};

export default Blog;