import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import RelatedBlogs from "./RelatedBlogs";
import ApiService from "../Services/ApiServices";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "./BlogDetail.css"

// Set up PDF worker from CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const BlogDetail = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const pdfContainerRef = useRef(null);
  const location = useLocation();
  const blog = location?.state?.blogDetail;

  useEffect(() => {
    const renderPDF = async () => {
      if (!blog?.pdfFile || !pdfContainerRef.current) return;

      try {
        let loadingTask;

        // Handle base64 or URL PDF
        if (blog.pdfFile.startsWith("data:application/pdf;base64,")) {
          const base64 = blog.pdfFile.split(",")[1];
          const binaryString = atob(base64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          loadingTask = pdfjsLib.getDocument({ data: bytes });
        } else {
          const encodedURL = encodeURI(blog.pdfFile);
          loadingTask = pdfjsLib.getDocument(encodedURL);
        }

        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
        const container = pdfContainerRef.current;
        container.innerHTML = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Dynamically scale to container width
          const containerWidth = container.clientWidth || window.innerWidth;
          const unscaledViewport = page.getViewport({ scale: 1 });
          const scale = containerWidth / unscaledViewport.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          canvas.style.marginBottom = "1rem";
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          container.appendChild(canvas);
        }
      } catch (error) {
        console.error("Error rendering PDF: ", error);
        pdfContainerRef.current.innerHTML = "<p>Failed to load PDF.</p>";
      }
    };

    renderPDF();
  }, [blog]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/" className="back-button" style={{ display: "block", margin: "1rem 1rem" ,padding:"10px 10px",width:"150px",height:"50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
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

      <div ref={pdfContainerRef} style={{ padding: "1rem", width: "100%" }} />

      {/* Optional Related Blogs */}
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
