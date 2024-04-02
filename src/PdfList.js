import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { Link } from "react-router-dom";

function PdfList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      let filesData = [];
      try {
        const response = await axios.get(
          "https://pdf-maker-krypto-backend.onrender.com/api/"
        );
        filesData = response.data;
        // console.log("fff", filesData);
      } catch (error) {
        console.log("err", error);
      } finally {
        setFiles([...filesData]);
      }
    };

    fetcher();
  }, []);

  return (
    <>
      {files.length !== 0 && (
        <div>
          <h1>pdf list</h1>

          <div class="container">
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              {files.map((f) => (
                <tbody>
                  <tr>
                    <td>{f?.file_name}</td>
                    <td>
                      <Link to="/pdfDetails" state={{ pdfUrl: f?.pdf_url }}>
                        view
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfList;
