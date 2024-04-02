import "./App.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    const tempDoc = document.querySelectorAll(".react-pdf__Document");
    tempDoc.forEach((t) => {
      t.style.display = "flex";
      t.style.justifyContent = "center";
    });
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
      style.display = "none";
    });

    const tempCanvas = document.querySelectorAll(".react-pdf__Page__canvas");

    tempCanvas.forEach((t) => {
      t.style.border = "2px solid red";
    });
  }

  useEffect(() => {
    const container = document.querySelector(".pdf-container");

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    if (container) {
      container.addEventListener("contextmenu", handleContextMenu);
    }

    return () => {
      if (container) {
        container.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, []);

  return (
    <div className="pdf-container">
      <Document
        file="https://res.cloudinary.com/djlrezkti/image/upload/v1712045037/Non-Disclosure_Agreement_NDA__NADA-AHMED_bymwil.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
      </Document>

      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn"
          style={{ backgroundColor: "red", cursor: "pointer" }}
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            } else {
              return;
            }
          }}
        >
          Previous
        </button>
        <p className="ms-2 me-2">
          Page {pageNumber} of {numPages}
        </p>
        <button
          className="btn"
          style={{ backgroundColor: "green", cursor: "pointer" }}
          onClick={() => {
            if (pageNumber === numPages) {
              return;
            } else {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
