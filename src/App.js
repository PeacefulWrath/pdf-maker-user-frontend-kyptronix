import "./App.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState } from "react";
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
      t.style.height = "800px";
    });
  }

  function removeTextLayerOffset() {
    // const textLayers = document.querySelectorAll(
    //   ".react-pdf__Page__textContent"
    // );
    // textLayers.forEach((layer) => {
    //   const { style } = layer;
    //   style.top = "0";
    //   style.left = "0";
    //   style.transform = "";
    // });

    const tempCanvas = document.querySelectorAll(".react-pdf__Page__canvas");

    tempCanvas.forEach((t) => {
      t.style.border = "2px solid red";
    });
  }

  return (
    <>
      <Document
        file="https://res.cloudinary.com/djlrezkti/image/upload/v1712033597/page-46_r9dmbm.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
      </Document>

      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn"
          style={{ backgroundColor: "red" }}
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
          style={{ backgroundColor: "green" }}
          onClick={() => {
            if (pageNumber === numPages) {
              return;
            }
            setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
