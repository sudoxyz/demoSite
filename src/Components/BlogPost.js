import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import RouteTransition from "./RouteTransition";
import fm from "front-matter";

const BlogPost = () => {
  const { id } = useParams();
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    document.title = `CSS | Blog Post ${id}`;
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const blog = data.find((b) => String(b.id) === String(id));
        if (blog && blog.mdFile) {
          fetch(blog.mdFile)
            .then((res) => res.text())
            .then((text) => {
              const { body } = fm(text); 
              setMarkdown(body);
            });
        } else {
          setMarkdown("Blog not found.");
        }
      });
  }, [id]);

  return (
    <div>
      <RouteTransition>
        <div className="blog-box">
          <ReactMarkdown>{markdown || "Blog not found."}</ReactMarkdown>
        </div>
      </RouteTransition>
    </div>
  );
};

export default BlogPost;