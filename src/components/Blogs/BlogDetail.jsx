import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import RelatedBlogs from "./RelatedBlogs";
import ApiService from "../Services/ApiServices";

import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";



import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;




const BlogDetail = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [textContent, setTextContent] = useState("");
  const location = useLocation();
  const blog = location?.state?.blogDetail;

  console.log("rrr", blog);

  useEffect(() => {
    const fetchAndParsePDF = async () => {
      if (!blog?.pdfFile) return;

      try {
        const loadingTask = pdfjsLib.getDocument(blog.pdfFile);
        const pdf = await loadingTask.promise;

        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }

        setTextContent(fullText);
      } catch (error) {
        console.error("Error loading PDF: ", error);
      }
    };

    fetchAndParsePDF();
  }, [blog]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/" className="back-button">
        ← Back to Blogs
      </Link>

      <div className="blog-detail-container">
        <img src={blog.image} alt={blog.title} className="blog-detail-image" />
        <h1 className="blog-detail-title">{blog.title}</h1>
        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      <div style={{ whiteSpace: "pre-wrap", padding: "1rem" }}>
        {textContent ? textContent : <p>Loading PDF content...</p>}
      </div>

      {/* Uncomment if you want related blogs section */}
      {/* {relatedBlogs.length > 0 && (
        <>
          <h2 className="related-blogs-title">Related Topics</h2>
          <RelatedBlogs blogs={relatedBlogs} />
        </>
      )} */}
    </div>
  );
};

export default BlogDetail;
